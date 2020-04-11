/**
 * @file Creates a Class Version1APIs that will initialize ApiRoutes for version v1.
 * @this Version1APIs
 * @exports Version1APIs
 * 
 * @author Darshan Shah
 */

import express from "express";

import ApiRouter from "../../../common/interfaces/apiRouter.interface";

import SuperheroRouter from "./superhero/superhero.router";

class Version1APIs {
  public app: express.Application;
  private readonly apis: ApiRouter[]

  /**
   * @constructor
   */
  constructor() {
    this.app = express();
    this.apis = [
      new SuperheroRouter()
    ];
    this.initializeAPIRoutes();
  }

  /**
   * @func initializeAPIRoutes Initializes controller.
   */
  private initializeAPIRoutes() {
    this.apis.forEach(api => {
      this.app.use("/v1", api.router);
    });
  }
}

export default Version1APIs;