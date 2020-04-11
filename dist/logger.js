"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log4js_1 = __importDefault(require("log4js"));
log4js_1.default.configure({
    "appenders": {
        "console": {
            "type": "console",
            "level": "debug",
            "layout": {
                "type": "pattern",
                "pattern": "[%d{ISO8601}] %[[%p]%] - %m"
            }
        },
        "logfile": {
            "type": "file",
            "level": "debug",
            "filename": "ts-starter-app.log",
            "pattern": "-yyyy-MM-dd",
            "layout": {
                "type": "pattern",
                "pattern": "[%d{DATE}] [%p] - %m"
            },
            "maxLogSize": 1024,
            "backups": 3
        }
    },
    "categories": {
        "default": {
            "appenders": ["logfile", "console"],
            "level": "debug"
        }
    }
});
const logger = log4js_1.default.getLogger("ts-starter");
exports.default = logger;
//# sourceMappingURL=logger.js.map