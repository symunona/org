export default interface iFile {
    path: string
    lastModified?: Date
    created?: Date
    history?: string
    meta?: { [attrKey: string]: any }
    content?: string
    dirty?: boolean
}