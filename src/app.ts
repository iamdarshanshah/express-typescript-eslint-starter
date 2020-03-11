import express from "express";
import bodyParser from "body-parser";

import mongoose from "mongoose";

import errorMiddleware from "./common/httpErrorHandler.middleware";
import Version1Apis from "./api/internal";
import morgan from "morgan";
import helmet from "helmet";

import logger from "./logger";

import config from "./appConfigs";

export default class App {
  public app: express.Application;
  public port: number;
  private readonly APIs: Version1Apis[];

  /**
   * @constructor
   * @param controllers
   * @param port
   */
  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.APIs = [new Version1Apis()];
    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeAPIs(this.APIs);
    this.initializeErrorhandling();
  }

  /**
   * @func listen Make the server to listen at specified port.
   */
  public listen() {
    this.app.listen(this.port, () => {
      logger.debug(`server started at http://localhost:${this.port}`);
    });
  }

  /**
   * @func initializeMiddlewares Initializes all the middleware
   */
  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    morgan.token("time", () => Date().toString()); // Both morgan and log4js are configured to same date format, so that log reading is meaningful and not confusing due to different date formats
    this.app.use(morgan("[:time] :remote-addr :method :url :status :res[content-length] :response-time ms"));
    this.app.use(helmet());
  }

  /**
   * @func initializeErrorhandling Initializes error handling middleware.
   */
  private initializeErrorhandling() {
    this.app.use(errorMiddleware);
  }

  /**
   * @func initializeAPIs initializes all the apis for specific version
   * @param apis
   */
  private initializeAPIs(APIs: Version1Apis[]){
    APIs.forEach(api => {
      this.app.use("/", api.app);
    });
  }

  /**
   * @func connectToTheDatabase Configure the database.
   */
  private connectToTheDatabase() {
    const {
      // MONGO_USER,
      // MONGO_PASSWORD,
      MONGO_PATH,
      MONGODB_DATABASE
    } = config;
    mongoose
      .connect(`mongodb://${MONGO_PATH}/${MONGODB_DATABASE}`, {
        useNewUrlParser: true
        // auth: {
        //   user: MONGO_USER || '',
        //   password: MONGO_PASSWORD || ''
        // }
      })
      .catch(err => console.log("Error connecting: ", err));
  }
}
