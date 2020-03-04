/**
 * @file Creates a Class SuperheroController that will initialize all the routes.
 * @this SuperheroController
 * @exports SuperheroController
 *
 * @author Darshan Shah
 */

import express from 'express';
import { NextFunction, Request, Response } from "express";


import mongoose from 'mongoose';
// import Superhero from './superhero.interface';
import superheroModel from './superhero.model';
import HttpException from '../exceptions/HttpException';
import Superhero from './superhero.interface';

export default class SuperheroController {
  public path = '/superheroes';
  public router = express.Router();

  /**
   * @constructor
   */
  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    this.router.get(this.path, this.getAllSuperheroes);
    this.router.get(`${this.path}/:id`, this.getSuperheroById);
    this.router.post(this.path, this.createSuperhero);
  }

  /**
   *
   * @param request
   * @param response
   * @param next
   */
  public getAllSuperheroes(
    request: Request,
    response: Response,
    next: NextFunction,
  ): void {
    superheroModel.find().then((superheroes) => {
      if (superheroes) response.status(200).send(superheroes);
      else next(new HttpException(404, 'no superheroes found'));
    });
  }

  /**
   *
   * @param request
   * @param response
   * @param next
   */
  public getSuperheroById(
    request: Request,
    response: Response,
    next: NextFunction,
  ): void {
    const id = new mongoose.Types.ObjectId(request.params.id);
    superheroModel.find(id).then((superhero) => {
      if (superhero) response.status(200).send(superhero);
      else next(new HttpException(404, `no superhero found for id :: ${id}`));
    });
  }

  public createSuperhero(request: Request, response: Response, next: NextFunction): void {
    const superhero: Superhero = request.body;
    superheroModel
      .create(superhero)
      .then((res) => {
        if (res) response.status(200).send(res);
        else next(new HttpException(500, 'Internal server error'));
      });
  }
}
