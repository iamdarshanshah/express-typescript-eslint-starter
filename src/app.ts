import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';

import mongoose from 'mongoose';

import Controller from "./interfaces/controller.interface";
import errorMiddleware from "./middlewares/error.middleware";
import Version1Apis from "./api/internal";

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
    // this.initializeControllers(controllers);
    this.initializeErrorhandling();
  }

  /**
   * @func listen Make the server to listen at specified port.
   */
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`server started at http://localhost:${this.port}`);
    });
  }

  /**
   * @func initializeMiddlewares Initializes all the middleware
   */
  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
  }

  /**
   * @func initializeErrorhandling Initializes error handling middleware.
   */
  private initializeErrorhandling() {
    this.app.use(errorMiddleware);
  }

  /**
   * @func initializeControllers Initializes controller.
   * @param controllers
   */
  // private initializeControllers(controllers: Controller[]) {
  //   controllers.forEach(controller => {
  //     this.app.use('/', controller.router);
  //   });
  // }

  /**
   * @func initializeAPIs initializes all the apis for specific version
   * @param apis
   */
  private initializeAPIs(APIs: Version1Apis[]){
    APIs.forEach(api => {
      this.app.use('/', api.app);
    })
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
    } = process.env;
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
