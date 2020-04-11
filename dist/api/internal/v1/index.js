"use strict";
/**
 * @file Creates a Class Version1APIs that will initialize ApiRoutes for version v1.
 * @this Version1APIs
 * @exports Version1APIs
 *
 * @author Darshan Shah
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const superhero_router_1 = __importDefault(require("./superhero/superhero.router"));
class Version1APIs {
    /**
     * @constructor
     */
    constructor() {
        this.app = express_1.default();
        this.apis = [
            new superhero_router_1.default()
        ];
        this.initializeAPIRoutes();
    }
    /**
     * @func initializeAPIRoutes Initializes controller.
     */
    initializeAPIRoutes() {
        this.apis.forEach(api => {
            this.app.use("/v1", api.router);
        });
    }
}
exports.default = Version1APIs;
//# sourceMappingURL=index.js.map