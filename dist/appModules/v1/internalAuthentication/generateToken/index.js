"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createToken_1 = __importDefault(require("./createToken"));
const logger_1 = __importDefault(require("../../../../logger"));
class GenerateToken {
    constructor(domain, email, expirytime) {
        this.domain = domain;
        this.email = email;
        this.expiryInMinutes = expirytime;
    }
    createToken() {
        createToken_1.default.createToken(this.domain, this.email, this.expiryInMinutes, (err, result) => {
            if (err) {
                logger_1.default.error("Creation of token failed with ERROR::", err);
            }
            else {
                logger_1.default.info("Token successfully generated");
                logger_1.default.info("Token Details ::", JSON.stringify(result, null, 2));
            }
        });
    }
}
exports.default = GenerateToken;
//# sourceMappingURL=index.js.map