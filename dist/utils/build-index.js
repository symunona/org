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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importStar(require("path"));
const underscore_1 = require("underscore");
const yaml_front_matter_1 = require("yaml-front-matter");
const file_list_1 = __importDefault(require("./file-list"));
const SETTINGS_FILE_NAME = '.org.json';
function buildIndex(rootPath) {
    const files = (0, file_list_1.default)(rootPath).map(file => file.substring(rootPath.length));
    const { tagMap, folderMetaMap } = buildTagMap(files, rootPath);
    // parse root org settings file if exists.
    let rootOrg = {};
    try {
        rootOrg = JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(rootPath, SETTINGS_FILE_NAME), 'utf-8'));
        if (rootOrg.quickEdit) {
        }
    }
    catch (e) {
        console.warn('[ORG] no root settings file');
    }
    // console.log(tagMap)
    console.log(files.filter(file => file.endsWith('.md')));
    console.log(folderMetaMap);
    console.log(tagMap.focus);
    console.log('----------------------------------------');
    return {
        tagMap,
        files,
        rootOrg
    };
}
exports.default = buildIndex;
/**
 *
 * @param files list of relative paths to rootort of mechanized private library in which an individual stores all his books, records, and communications, and which may be consulted with exceeding speed and flexibility. It is an enlarged intimate supplement to his memory.
 * @param rootPath root path
 * @returns Object map
 */
function buildTagMap(files, rootPath) {
    const tagMap = {};
    const folderMetaMap = {};
    files.map(file => {
        // Add the path folders as tags.
        let tags = getTagsFromFileName(file);
        if (file.endsWith('.md')) {
            const frontMatterData = readFrontMatter(file, rootPath);
            // Tags accessible this folder
            tags = tags.concat(frontMatterData.tags || []);
            // In a folder, we assume similar files, so we collect all
            // the properties the files have in there, so we can smart
            // suggest on new and on update.
            if (Object.keys(frontMatterData).length) {
                const dir = (0, path_1.dirname)(file);
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
    });
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
//# sourceMappingURL=build-index.js.map