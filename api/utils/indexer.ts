import iFile from "api/interface/iFile";
import iIndex from "api/interface/iIndex";
import iOrgJson from "api/interface/iOrgJson";
import { readFileSync } from "fs";
import path, { dirname, join } from "path";
import { extend, union, uniq, without } from "underscore";
import { safeLoadFront } from 'yaml-front-matter';
import { ROOT, getFilesRecursiveRelative, getFileWithStatsFromPath } from "./file-list";

const SETTINGS_FILE_NAME = '.org.json'

var cachedIndex: iIndex;

export default function buildIndex(): iIndex {
    const start = new Date()
    const files = getFilesRecursiveRelative()

    const { tagMap, folderMetaMap } = buildTagMap(files)
    // parse root org settings file if exists.
    let rootOrg: iOrgJson = {
        quickEdit: []
    }
    try {
        const rootOrgPath = join(ROOT, SETTINGS_FILE_NAME)
        let rootOrgRaw = JSON.parse(readFileSync(rootOrgPath, 'utf-8'))
        // These are just files, let's map them with stats.
        if (rootOrg['quickEdit']) {
            rootOrg.quickEdit = rootOrgRaw.quickEdit.filter((filePath: string) => {
                try {
                    return getFileWithStatsFromPath(join(ROOT, filePath))
                } catch (e) {
                    console.warn('[ORG] error reading quickEdit file ', path, e.message)
                }
                return false
            })
        }
    } catch (e) {
        console.warn('[ORG] no root settings file')
    }

    console.log('[ORG] index built in', new Date().getTime() - start.getTime())
    return cachedIndex = {
        tagMap,
        folderMetaMap,
        files,
        rootOrg
    }
}

/**
 *any
 * @param files list of relative paths to rootort of mechanized private library in which an individual stores all his books, records, and communications, and which may be consulted with exceeding speed and flexibility. It is an enlarged intimate supplement to his memory.
 * @param ROOT root path
 * @returns Object map
 */
function buildTagMap(files: Array<iFile>) {
    const tagMap: { [tagName: string]: Array<iFile> } = {}
    const folderMetaMap: { [dir: string]: Array<string> } = {}
    files.map(async (file) => {
        // Add the path folders as tags.
        let tags = getTagsFromFileName(file.path)

        if (file.path.endsWith('.md')) {
            const frontMatterData = await readFrontMatter(file.path, ROOT)
            file.meta = frontMatterData
            // Tags accessible this folder
            tags = tags.concat(frontMatterData.tags || [])
            // In a folder, we assume similar files, so we collect all
            // the properties the files have in there, so we can smart
            // suggest on new and on update.
            if (Object.keys(frontMatterData).length) {
                const dir = dirname(file.path)
                folderMetaMap[dir] = folderMetaMap[dir] || []
                folderMetaMap[dir] = without(uniq(
                    folderMetaMap[dir].concat(Object.keys(frontMatterData))),
                    '__content')
            }
        }

        tags.map(tag => {
            if (tag) {
                tagMap[tag] = tagMap[tag] || []
                tagMap[tag].push(file)
            }
        })
    })
    return {
        tagMap,
        folderMetaMap
    }
}


function readFrontMatter(file: string, rootPath: string): any {
    try {
        const fileContent = readFileSync(join(rootPath, file), 'utf-8')
        return safeLoadFront(fileContent)
    } catch (e) {
        console.error('[ORG] front matter parsing error', file)
    }
    return {}
}

/**
 * Each folder IS a tag.
 */
function getTagsFromFileName(fileName: string) {
    const tags = fileName.split(path.sep)
    tags.pop()
    return tags;
}

/**
 * Loads files with metadata!
 * @param {string} path
 * @returns {iFile}
 */
export function load(path: string) {
    const absolutePath = join(ROOT, path)
    const file = getFileWithStatsFromPath(absolutePath)
    // Get the folder's props from the index.
    // Get meta data of the folder:
    const folderMeta = cachedIndex.folderMetaMap[path]

    const content = readFileSync(absolutePath, 'utf8')
    file.content = content
    try {
        const frontMeta = safeLoadFront(content)
        extend(folderMeta, frontMeta)
    } catch (e) {
        console.error('[ORG] front matter parsing error', file)
    }
    file.meta = folderMeta
    return file
}