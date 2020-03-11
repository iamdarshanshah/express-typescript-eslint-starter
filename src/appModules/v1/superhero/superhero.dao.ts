import superheroModel from "./superhero.model";
import Superhero from "./superhero.interface";

import logger from "../../../logger";

class SuperheroDao {
  getAllSuperheroes(done: CallableFunction){
    superheroModel.find().then((superheroes: Superhero[])=>{
      done(null,superheroes);
    }).catch((err)=>{
      logger.error("Error occured in finding superhero", err);
      done({err});
    });
  }

  getSuperheroById(id: string,done: CallableFunction){
    superheroModel.findById(id).then((superhero)=>{
      logger.info("Succesfully extracted superhero from db");
      done(null,superhero);
    }).catch((err)=>{
      done({err});
    });
  }

  
}

export default new SuperheroDao();