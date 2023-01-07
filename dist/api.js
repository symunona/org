"use strict";
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
const dotenv_1 = __importDefault(require("dotenv"));
const build_index_1 = __importDefault(require("./utils/build-index"));
dotenv_1.default.config();
console.log('[ORG] Welcome to ORG! Staring up...');
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
server.get('/index', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('[ORG] building index');
    return (0, build_index_1.default)(process.env.ROOT);
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