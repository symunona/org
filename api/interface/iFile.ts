export default interface iFile {
    path: string;
    lastModified: Date;
    created: Date;
    history?: string
}