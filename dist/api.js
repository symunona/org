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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
// import { Server, IncomingMessage, ServerResponse } from 'http'
const { NotFound } = require('http-errors');
const dotenv_1 = __importDefault(require("dotenv"));
const indexer_1 = __importStar(require("./utils/indexer"));
const file_list_1 = require("./utils/file-list");
dotenv_1.default.config();
console.log('[ORG] Welcome to ORG! Staring up...');
if (!file_list_1.ROOT) {
    console.error('[ORG] please set the ROOT environmental variable to your note\'s root');
    process.exit(1);
}
console.log('[ORG] root is', file_list_1.ROOT);
const port = parseInt(process.env.PORT, 10) || 3000;
const server = (0, fastify_1.default)({});
const opts = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    pong: {
                        type: 'string'
                    }
                }
            }
        }
    }
};
server.get('/api/index', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('[ORG] building index');
    return (0, indexer_1.default)();
}));
server.decorate('notFound', (request, reply) => {
    reply.code(404).type('text/html').send('Not Found');
});
server.get('/api/load/*', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fileName = req.params['*'];
    console.log('[ORG] !!! getting file', fileName);
    if (!(0, file_list_1.exists)(fileName)) {
        throw new NotFound(fileName + ' not found.');
    }
    return yield (0, indexer_1.load)(fileName);
}));
server.get('/ping', opts, (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    return { pong: 'it worked!' };
}));
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield server.listen({ port });
        const address = server.server.address();
        console.log('[ORG] address: ', address);
    }
    catch (err) {
        console.error('[ORG] ewww', err.message);
        server.log.error(err);
        process.exit(1);
    }
});
start();
//# sourceMappingURL=api.js.map