import superheroModel from './superhero.model';
import Superhero from './superhero.interface';

class SuperheroDao {
  getAllSuperheroes(done: CallableFunction){
    superheroModel.find().then((superheroes: Superhero[])=>{
      done(null,superheroes);
    }).catch((err)=>{
      done({err});
    })
  }

  getSuperheroById(id: string,done: CallableFunction){
    superheroModel.findById(id).then((superhero)=>{
      done(null,superhero);
    }).catch((err)=>{
      done({err});
    })
  }

  
}

export default new SuperheroDao();