"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const httpErrorHandler_middleware_1 = __importDefault(require("./common/httpErrorHandler.middleware"));
const internal_1 = __importDefault(require("./api/internal"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const logger_1 = __importDefault(require("./logger"));
const appConfigs_1 = __importDefault(require("./appConfigs"));
class App {
    /**
     * @constructor
     * @param controllers
     * @param port
     */
    constructor(port) {
        this.app = express_1.default();
        this.port = port;
        this.APIs = [new internal_1.default()];
        this.connectToTheDatabase();
        this.initializeMiddlewares();
        this.initializeAPIs(this.APIs);
        this.initializeErrorhandling();
    }
    /**
     * @func listen Make the server to listen at specified port.
     */
    listen() {
        this.app.listen(this.port, () => {
            logger_1.default.debug(`server started at http://localhost:${this.port}`);
        });
    }
    /**
     * @func initializeMiddlewares Initializes all the middleware
     */
    initializeMiddlewares() {
        this.app.use(body_parser_1.default.json());
        morgan_1.default.token("time", () => Date().toString()); // Both morgan and log4js are configured to same date format, so that log reading is meaningful and not confusing due to different date formats
        this.app.use(morgan_1.default("[:time] :remote-addr :method :url :status :res[content-length] :response-time ms"));
        this.app.use(helmet_1.default());
    }
    /**
     * @func initializeErrorhandling Initializes error handling middleware.
     */
    initializeErrorhandling() {
        this.app.use(httpErrorHandler_middleware_1.default);
    }
    /**
     * @func initializeAPIs initializes all the apis for specific version
     * @param apis
     */
    initializeAPIs(APIs) {
        APIs.forEach(api => {
            this.app.use("/", api.app);
        });
    }
    /**
     * @func connectToTheDatabase Configure the database.
     */
    connectToTheDatabase() {
        const { 
        // MONGO_USER,
        // MONGO_PASSWORD,
        MONGO_PATH, MONGODB_DATABASE } = appConfigs_1.default;
        mongoose_1.default
            .connect(`mongodb://${MONGO_PATH}/${MONGODB_DATABASE}`, {
            useNewUrlParser: true
            // auth: {
            //   user: MONGO_USER || '',
            //   password: MONGO_PASSWORD || ''
            // }
        })
            .catch(err => console.log("Error connecting: ", err));
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map