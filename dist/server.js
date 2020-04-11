"use strict";
/**
 * @description Entry point for application
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const appConfigs_1 = __importDefault(require("./appConfigs"));
const app = new app_1.default(appConfigs_1.default.PORT);
app.listen();
//# sourceMappingURL=server.js.map