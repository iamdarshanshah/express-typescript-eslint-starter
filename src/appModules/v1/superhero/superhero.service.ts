import SupereroDao from "./superhero.dao";

class SuperheroService {
  public getAllSuperheroes(done: CallableFunction){
    SupereroDao.getAllSuperheroes(done);
  }

  public getSuperheroById(id: string, done: CallableFunction) {
   SupereroDao.getSuperheroById(id,done);
  }
}

export default new SuperheroService();