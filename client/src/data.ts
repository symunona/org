import fetch from "axios";
import iFile from "../../api/interface/iFile";
import iOrgJson from "../../api/interface/iOrgJson";

interface Tag {
  name: string;
  count: number;
  files: string;
}

interface IndexStructure {
  tags: Array<Tag>;
  rootOrg: iOrgJson;
}

let indexCache: IndexStructure;

const fileCache: { [path: string]: iFile } = {};

export async function load(path: string) {
  if (fileCache[path]) {
    return fileCache[path];
  } else {
    fileCache[path] = await fetch("api/load/" + path);
  }
}

export async function get() {
  if (!indexCache) {
    const cacheWrapper = await fetch("/api/index");
    console.log("[ORG] cache:", cacheWrapper.data);
    indexCache = cacheWrapper.data;
    return cacheWrapper.data;
  } else {
    return indexCache;
  }
}

export { indexCache as cache };
