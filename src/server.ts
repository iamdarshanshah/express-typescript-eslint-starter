
/**
 * @description Entry point for application
 */

import 'dotenv/config';
import App from './app';
import SuperheroController from './superhero/superhero.controller';

const app = new App( [ new SuperheroController ] , 4000);

app.listen();