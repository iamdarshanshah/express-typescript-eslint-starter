/**
 * @file Creates a Class App that will initialize middleware, database, and controllers.
 * @this App
 * @exports App
 * 
 * @author Darshan Shah
 */


import 'dotenv/config';
import express from 'express';

import Controller from '../../../interfaces/controller.interface';

import SuperheroController from '../../../modules/superhero/superhero.controller';

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
      new SuperheroController()
    ]
    this.initializeControllers();
  }

  /**
   * @func initializeControllers Initializes controller.
   */
  private initializeControllers() {
    this.controllers.forEach(controller => {
      this.app.use('/v1', controller.router);
    });
  }
}

export default Version1APIs;