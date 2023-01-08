"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exists = exports.getFileWithStatsFromPath = exports.getFilesRecursiveRelative = exports.getFilesRecursive = exports.ROOT = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.ROOT = process.env.ROOT;
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
                files.push({
                    path: absolutePath,
                    lastModified: stats.mtime,
                    created: stats.ctime
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
exports.getFilesRecursive = getFilesRecursive;
function getFilesRecursiveRelative() {
    const files = getFilesRecursive(exports.ROOT);
    files.forEach(file => file.path = file.path.substring(exports.ROOT.length + 1));
    return files;
}
exports.getFilesRecursiveRelative = getFilesRecursiveRelative;
function getFileWithStatsFromPath(path) {
    const stats = (0, fs_1.statSync)(path);
    return {
        path: path,
        lastModified: stats.mtime,
        created: stats.ctime
    };
}
exports.getFileWithStatsFromPath = getFileWithStatsFromPath;
function exists(path) {
    return (0, fs_1.existsSync)((0, path_1.join)(exports.ROOT, path));
}
exports.exists = exists;
//# sourceMappingURL=file-list.js.map