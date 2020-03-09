
/**
 * @description Entry point for application
 */

import 'dotenv/config';
import App from './app';

const app = new App(4000);

app.listen();