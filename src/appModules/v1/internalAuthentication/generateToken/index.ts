import TokenCreator from "./createToken";
import logger from "../../../../logger";
import Token from "./token.interface";

class GenerateToken {
  private domain: string | undefined;
  private email: string | undefined;
  private expiryInMinutes: string | undefined;

  constructor(domain: string | undefined, email: string | undefined, expirytime: string | undefined){
    this.domain = domain;
    this.email = email;
    this.expiryInMinutes = expirytime;
  }

  createToken(){
    TokenCreator.createToken(this.domain, this.email, this.expiryInMinutes, (err: Error,result: Token)=>{
      if(err){
        logger.error("Creation of token failed with ERROR::", err);
      } else {
        logger.info("Token successfully generated");
        logger.info("Token Details ::", JSON.stringify(result,null,2));
      }
    })
  }

}

export default GenerateToken;