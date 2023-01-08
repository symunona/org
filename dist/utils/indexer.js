"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.load = void 0;
const fs_1 = require("fs");
const path_1 = __importStar(require("path"));
const underscore_1 = require("underscore");
const yaml_front_matter_1 = require("yaml-front-matter");
const file_list_1 = require("./file-list");
const SETTINGS_FILE_NAME = '.org.json';
var cachedIndex;
function buildIndex() {
    const start = new Date();
    const files = (0, file_list_1.getFilesRecursiveRelative)();
    const { tagMap, folderMetaMap } = buildTagMap(files);
    // parse root org settings file if exists.
    let rootOrg = {
        quickEdit: []
    };
    try {
        const rootOrgPath = (0, path_1.join)(file_list_1.ROOT, SETTINGS_FILE_NAME);
        let rootOrgRaw = JSON.parse((0, fs_1.readFileSync)(rootOrgPath, 'utf-8'));
        // These are just files, let's map them with stats.
        if (rootOrg['quickEdit']) {
            rootOrg.quickEdit = rootOrgRaw.quickEdit.filter((filePath) => {
                try {
                    return (0, file_list_1.getFileWithStatsFromPath)((0, path_1.join)(file_list_1.ROOT, filePath));
                }
                catch (e) {
                    console.warn('[ORG] error reading quickEdit file ', path_1.default, e.message);
                }
                return false;
            });
        }
    }
    catch (e) {
        console.warn('[ORG] no root settings file');
    }
    console.log('[ORG] index built in', new Date().getTime() - start.getTime());
    return cachedIndex = {
        tagMap,
        folderMetaMap,
        files,
        rootOrg
    };
}
exports.default = buildIndex;
/**
 *any
 * @param files list of relative paths to rootort of mechanized private library in which an individual stores all his books, records, and communications, and which may be consulted with exceeding speed and flexibility. It is an enlarged intimate supplement to his memory.
 * @param ROOT root path
 * @returns Object map
 */
function buildTagMap(files) {
    const tagMap = {};
    const folderMetaMap = {};
    files.map((file) => __awaiter(this, void 0, void 0, function* () {
        // Add the path folders as tags.
        let tags = getTagsFromFileName(file.path);
        if (file.path.endsWith('.md')) {
            const frontMatterData = yield readFrontMatter(file.path, file_list_1.ROOT);
            file.meta = frontMatterData;
            // Tags accessible this folder
            tags = tags.concat(frontMatterData.tags || []);
            // In a folder, we assume similar files, so we collect all
            // the properties the files have in there, so we can smart
            // suggest on new and on update.
            if (Object.keys(frontMatterData).length) {
                const dir = (0, path_1.dirname)(file.path);
                folderMetaMap[dir] = folderMetaMap[dir] || [];
                folderMetaMap[dir] = (0, underscore_1.without)((0, underscore_1.uniq)(folderMetaMap[dir].concat(Object.keys(frontMatterData))), '__content');
            }
        }
        tags.map(tag => {
            if (tag) {
                tagMap[tag] = tagMap[tag] || [];
                tagMap[tag].push(file);
            }
        });
    }));
    return {
        tagMap,
        folderMetaMap
    };
}
function readFrontMatter(file, rootPath) {
    try {
        const fileContent = (0, fs_1.readFileSync)((0, path_1.join)(rootPath, file), 'utf-8');
        return (0, yaml_front_matter_1.safeLoadFront)(fileContent);
    }
    catch (e) {
        console.error('[ORG] front matter parsing error', file);
    }
    return {};
}
/**
 * Each folder IS a tag.
 */
function getTagsFromFileName(fileName) {
    const tags = fileName.split(path_1.default.sep);
    tags.pop();
    return tags;
}
/**
 * Loads files with metadata!
 * @param {string} path
 * @returns {iFile}
 */
function load(path) {
    const absolutePath = (0, path_1.join)(file_list_1.ROOT, path);
    const file = (0, file_list_1.getFileWithStatsFromPath)(absolutePath);
    // Get the folder's props from the index.
    // Get meta data of the folder:
    const folderMeta = cachedIndex.folderMetaMap[path];
    const content = (0, fs_1.readFileSync)(absolutePath, 'utf8');
    file.content = content;
    try {
        const frontMeta = (0, yaml_front_matter_1.safeLoadFront)(content);
        (0, underscore_1.extend)(folderMeta, frontMeta);
    }
    catch (e) {
        console.error('[ORG] front matter parsing error', file);
    }
    file.meta = folderMeta;
    return file;
}
exports.load = load;
//# sourceMappingURL=indexer.js.map