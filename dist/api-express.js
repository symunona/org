"use strict";
// ORG API
// Does the heavy lifting.
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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
console.log('[ORG] Started.');
const ret = { info: 'from a labyrinth of a broken mind' };
// define a route handler for the default home page
app.get("/api", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // render the index template
    return res.json(ret);
}));
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // render the index template
    return res.send('ORG front page');
}));
// Start the express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`[ORG] server listening at http://localhost:${port}`);
});
//# sourceMappingURL=api-express.js.map