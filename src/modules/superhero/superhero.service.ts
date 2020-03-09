import SupereroDao from './superhero.dao';

class SuperheroService {
  getAllSuperheroes(done:CallableFunction){
    SupereroDao.getAllSuperheroes(done);
  }

  getSuperheroById(id:string,done:CallableFunction) {
   SupereroDao.getSuperheroById(id,done);
  }
}

export default new SuperheroService();