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
import superheroModel from './superhero.model';
import HttpException from '../../exceptions/HttpException';
import Superhero from './superhero.interface';
import SuperheroService from './superhero.service';

export default class SuperheroController {
  path = '/superheroes';
  router = express.Router();

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
    SuperheroService.getAllSuperheroes((err: Error,result: Superhero[])=>{
      if(err){
        next(new HttpException(404, 'no superheroes found'));
      }else {
        response.status(200).send(result);
      }
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
    const id = (String)(new mongoose.Types.ObjectId(request.params.id));
    SuperheroService.getSuperheroById(id,(err:Error,result:Superhero)=>{
      if(err){
        next(new HttpException(404, 'no superheroes found for the given id'));
      }else {
        response.status(200).send(result);
      }
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
