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
const appConfigs_1 = __importDefault(require("../../../appConfigs"));
const logger_1 = __importDefault(require("../../../logger"));
// import Payload from "./payload.interface";
class VerifyToken {
    jwtVerification(headers) {
        const token = headers.authorization;
        const decodedPayload = jsonwebtoken.verify(token, appConfigs_1.default.AUTH_SIGNING_SECRET);
        /* cld(client domain) and cls(client secret) will be the header inputs along with authorization */
        if (headers.cld === decodedPayload.domain
            && headers.cls === decodedPayload.secret) {
            return decodedPayload;
        }
        // If the domain or secret is not matched with what is passed in headers and decoded payload of the token
        const err = Error("The token provided is invalid, the domain/secret details dont match!!");
        err.name = "InvalidDomainOrSecret";
        throw err;
    }
    internalVerifyAuth(req, res, next) {
        try {
            const decodedPayload = new VerifyToken().jwtVerification(req.headers);
            req.claims = decodedPayload;
            next();
            return;
        }
        catch (err) {
            logger_1.default.error("Error in verifying token ", JSON.stringify(err));
            if (err.name === "TokenExpiredError") {
                res.status(401).send({ message: "Token has been expired..!" });
                return;
            }
            if (err.name === "InvalidDomainOrSecret") {
                res.status(401).send({ message: "Unauthorised or invalid request!!" });
                return;
            }
            res.status(401).send({ message: "Unauthorised or invalid request" });
        }
    }
}
exports.default = VerifyToken;
//# sourceMappingURL=verifyToken.js.map