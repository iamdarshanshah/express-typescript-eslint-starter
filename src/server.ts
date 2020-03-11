
/**
 * @description Entry point for application
 */

import App from "./app";

import config from "./appConfigs";

const app = new App(config.PORT);

app.listen();