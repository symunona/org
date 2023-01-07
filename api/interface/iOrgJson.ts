import iFile from "./iFile"

export default interface iOrgJson {
    // When parsed we need to manually make iFiles out of the paths
    // as we only store the paths.
    quickEdit: Array<iFile> | Array<string>
}