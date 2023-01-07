import iFile from "./iFile"
import iOrgJson from "./iOrgJson"

export default interface iIndex {
    // Each tag as which files are in them.
    tagMap: { [tag: string]: Array<iFile> }

    // Folders collect the content of all the files within them and
    // parse out the meta attribute keys.
    folderMetaMap: { [folder: string]: Array<string> },
    files: Array<iFile>
    rootOrg: iOrgJson
}