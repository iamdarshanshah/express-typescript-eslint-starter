/**
 * @file Creates a Class SuperheroController that will orchestrate the service methods to be invoked.
 * @this SuperheroController
 * @exports SuperheroController
 *
 * @author Darshan Shah
 */

import SuperheroService from "../../../../appModules/v1/superhero";

class SuperheroController {
  public getAllSuperheroes(done: CallableFunction){
    SuperheroService.getAllSuperheroes(done);
  }

  public getSuperheroById(id: string, done: CallableFunction) {
    SuperheroService.getSuperheroById(id,done);
   }

}

export default new SuperheroController();
