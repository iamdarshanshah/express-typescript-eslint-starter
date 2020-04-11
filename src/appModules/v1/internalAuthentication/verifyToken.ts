import * as jsonwebtoken from "jsonwebtoken";
import config from "../../../appConfigs";
import logger from "../../../logger";

import { Response, NextFunction } from "express";
// import Payload from "./payload.interface";

class VerifyToken {
  
  jwtVerification(headers: any) {
    const token = headers.authorization;
    const decodedPayload: any = jsonwebtoken.verify(token, config.AUTH_SIGNING_SECRET);

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

  internalVerifyAuth(req: any, res: Response, next: NextFunction){
    try {
      const decodedPayload = new VerifyToken().jwtVerification(req.headers);
      req.claims = decodedPayload;
      next();
      return;
    } catch (err) {
      logger.error("Error in verifying token ", JSON.stringify(err));
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

export default VerifyToken;