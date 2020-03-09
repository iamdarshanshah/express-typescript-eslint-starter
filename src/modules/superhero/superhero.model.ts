/**
 * @description Defines the model and schema to used by mongoose.
 * @exports superheroModel
 */
import mongoose from 'mongoose';

import Superhero from './superhero.interface';

const superheroSchema = new mongoose.Schema({
  name: String,
  power: String,
  universe: String,
});

const superheroModel = mongoose.model<Superhero & mongoose.Document>('Superhero', superheroSchema);

export default superheroModel;
