import axios from "axios"
import { sortBy } from "underscore"
import iFile from "../../api/interface/iFile"
import iIndex from "../../api/interface/iIndex"

// import {ref, Ref} from "vue"

// interface Tag {
//   name: string;
//   count: number;
//   files: string;
// }


let indexCache: iIndex

const fileCache: { [path: string]: iFile } = {}
const fileNameMap: { [path: string]: iFile } = {}

export async function load(path: string): Promise<iFile> {
  if (fileCache[path]) {
    // console.log('[ORG] found in file cache!', fileCache[path])
    return fileCache[path]
  } else {
    // console.log("[ORG] querying", "/api/load/" + path)
    const { data } = await axios.get<iFile>("/api/load/" + path)
    return fileCache[path] = data
  }
}

export async function get(): Promise<iIndex> {
  if (!indexCache) {
    const cacheWrapper = await axios.get<iIndex>("/api/index")
    // console.log("[ORG] cache:", cacheWrapper.data)
    indexCache = cacheWrapper.data
    indexCache.files.forEach((file: iFile) => fileNameMap[file.path] = file)
    return cacheWrapper.data
  } else {
    return indexCache
  }
}

export async function getFileToEdit(path: string): Promise<iFile> {
  if (!path) {
    console.error("[ORG] No path was provided for the editor!")
  }
  // const index = await get()
  // console.log('[ORG] index got:', index)
  if (fileNameMap[path]) {
    return await load(path)
  } else {
    // Do not bail if that file does not exists, just create a draft.
    return {
      path: path,
      dirty: true
    }
  }
}

// const recentTags:Ref<string> = ref()

export function recentlyEdited(n?: number) {
  const recent = sortBy(indexCache.files, 'lastModified').reverse()
  if (n){
    return recent.slice(0, n)
  }
  return recent
}

export { indexCache as cache }
