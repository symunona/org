
import { existsSync, readdirSync, statSync} from "fs";
import { join } from "path";

import iFile from "../interface/iFile"

import dotenv from 'dotenv'
dotenv.config()

export const ROOT = process.env.ROOT;

export function getFilesRecursive(currentPath: string): Array<iFile> {
    let files: Array<iFile> = []
    readdirSync(currentPath).forEach(file => {
        const absolutePath = join(currentPath, file)
        // Ignore files starting with a dot.
        if (file.startsWith('.')) { return }
        try {
            const stats = statSync(absolutePath)
            if (stats.isDirectory()) {
                files = files.concat(getFilesRecursive(absolutePath))
            } else {
                files.push({
                    path: absolutePath,
                    lastModified: stats.mtime,
                    created: stats.ctime
                })
            }
        } catch (e) {
            // just skip the file, and note the error!
            console.error('[ORG] file error: ', absolutePath)
        }
    })
    return files
}

export function getFilesRecursiveRelative(): Array<iFile> {
    const files = getFilesRecursive(ROOT)
    files.forEach(file => file.path = file.path.substring(ROOT.length + 1))
    return files
}

export function getFileWithStatsFromPath(path: string): iFile {
    const stats = statSync(path)
    return {
        path: path,
        lastModified: stats.mtime,
        created: stats.ctime
    }
}

export function exists(path: string){
    return existsSync(join(ROOT, path))
}
