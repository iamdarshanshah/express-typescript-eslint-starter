"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken = __importStar(require("jsonwebtoken"));
const logger_1 = __importDefault(require("../../../../logger"));
const appConfigs_1 = __importDefault(require("../../../../appConfigs"));
class TokenCreator {
    createToken(domain, email, expirytime, done) {
        const clientSecret = "abcdefghi";
        const tokenPayload = {
            domain,
            secret: clientSecret,
            email
        };
        if (!tokenPayload.domain || !tokenPayload.secret || !tokenPayload.email) {
            logger_1.default.error(`Cant create token,as necessary params are not provided:: ${JSON.stringify(tokenPayload)}`);
            return done({ error: "Cant create token,as necessary params are not provided" });
        }
        const expiryTimeInMinutes = parseInt((expirytime || "300"), 10);
        const signingOptions = {
            subject: "user",
            issuer: "Stack-EagleEye",
            expiresIn: (expiryTimeInMinutes * 60),
        };
        jsonwebtoken.sign(tokenPayload, appConfigs_1.default.AUTH_SIGNING_SECRET, signingOptions, (err, token) => {
            done(err, { token, clientSecret, expiryTimeInMinutes });
        });
    }
}
exports.default = new TokenCreator();
//# sourceMappingURL=createToken.js.map