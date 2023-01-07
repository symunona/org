import iFile from "api/interface/iFile";
import iOrgJson from "api/interface/iOrgJson";
import { readFileSync } from "fs";
import path, { dirname, join } from "path";
import { uniq, without } from "underscore";
import { safeLoadFront } from 'yaml-front-matter';
import { getFilesRecursiveRelative, getFileWithStatsFromPath } from "./file-list";

const SETTINGS_FILE_NAME = '.org.json'

export default function buildIndex(rootPath: string) {
    const files = getFilesRecursiveRelative(rootPath)

    const { tagMap, folderMetaMap } = buildTagMap(files, rootPath)
    // parse root org settings file if exists.
    let rootOrg: iOrgJson = {
        quickEdit: []
    }
    try {
        const rootOrgPath = join(rootPath, SETTINGS_FILE_NAME)
        let rootOrgRaw = JSON.parse(readFileSync(rootOrgPath, 'utf-8'))
        // These are just files, let's map them with stats.
        if (rootOrg['quickEdit']) {
            rootOrg.quickEdit = rootOrgRaw.quickEdit.filter((filePath: string) => {
                try {
                    return getFileWithStatsFromPath(join(rootPath, filePath))
                } catch (e) {
                    console.warn('[ORG] error reading quickEdit file ', path, e.message)
                }
                return false
            })
        }
    } catch (e) {
        console.warn('[ORG] no root settings file')
    }

    // console.log(tagMap)
    console.log(folderMetaMap)
    console.log(tagMap.focus)
    console.log('----------------------------------------');
    return {
        tagMap,
        folderMetaMap,
        files,
        rootOrg
    }
}

/**
 *
 * @param files list of relative paths to rootort of mechanized private library in which an individual stores all his books, records, and communications, and which may be consulted with exceeding speed and flexibility. It is an enlarged intimate supplement to his memory.
 * @param rootPath root path
 * @returns Object map
 */
function buildTagMap(files: Array<iFile>, rootPath: string) {
    const tagMap: any = {}
    const folderMetaMap: any = {}
    files.map(file => {
        // Add the path folders as tags.
        let tags = getTagsFromFileName(file.path)

        if (file.path.endsWith('.md')) {
            const frontMatterData = readFrontMatter(file.path, rootPath)
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