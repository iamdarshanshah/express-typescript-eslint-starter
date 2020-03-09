/**
 * @file Creates a Class App that will initialize middleware, database, and controllers.
 * @this App
 * @exports App
 * 
 * @author Darshan Shah
 */


import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';

import Controller from '../../../interfaces/controller.interface';
import errorMiddleware from '../../../middlewares/error.middleware';

import SuperherController from '../../../modules/superhero/superhero.controller';

class Version1APIs {
  public app: express.Application;
  private readonly controllers: Controller[]

  /**
   * 
   * @constructor
   * @param controllers 
   * @param port 
   */
  constructor() {
    this.app = express();
    this.controllers = [
      new SuperherController()
    ]
    this.initializeControllers();
  }

  /**
   * @func initializeControllers Initializes controller.
   * @param controllers 
   */
  private initializeControllers() {
    this.controllers.forEach(controller => {
      this.app.use('/v1', controller.router);
    });
  }
}

export default Version1APIs;