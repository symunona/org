"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
function getFilesRecursive(currentPath) {
    let files = [];
    (0, fs_1.readdirSync)(currentPath).forEach(file => {
        const absolutePath = (0, path_1.join)(currentPath, file);
        // Ignore files starting with a dot.
        if (file.startsWith('.')) {
            return;
        }
        try {
            const stats = (0, fs_1.statSync)(absolutePath);
            if (stats.isDirectory()) {
                files = files.concat(getFilesRecursive(absolutePath));
            }
            else {
                debugger;
                files.push({
                    path: absolutePath
                });
            }
        }
        catch (e) {
            // just skip the file, and note the error!
            console.error('[ORG] file error: ', absolutePath);
        }
    });
    return files;
}
exports.default = getFilesRecursive;
//# sourceMappingURL=file-list.js.map