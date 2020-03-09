
/**
 * @description Entry point for application
 */

import 'dotenv/config';
import App from './app';
import SuperheroController from './modules/superhero/superhero.controller';

const app = new App(4000);

app.listen();