import * as jsonwebtoken from "jsonwebtoken";
import logger from "../../../../logger";
import config from "../../../../appConfigs";

class TokenCreator{

  createToken(domain: string | undefined, email: string | undefined, expirytime: string | undefined, done: CallableFunction){
    const clientSecret = "abcdefghi";
    const tokenPayload = {
      domain,
      secret: clientSecret,
      email
    }

    if (!tokenPayload.domain || !tokenPayload.secret || !tokenPayload.email) {
      logger.error(`Cant create token,as necessary params are not provided:: ${JSON.stringify(tokenPayload)}`);
      return done({ error: "Cant create token,as necessary params are not provided" });
    }

    const expiryTimeInMinutes = parseInt((expirytime || "300"), 10);

    const signingOptions = {
      subject: "user",
      issuer: "Stack-EagleEye",
      expiresIn: (expiryTimeInMinutes * 60), // Has to be in seconds
    };

    jsonwebtoken.sign(tokenPayload, config.AUTH_SIGNING_SECRET, signingOptions, (err, token)=>{
      done(err, { token, clientSecret, expiryTimeInMinutes })
    })
     
  }

}

export default new TokenCreator();