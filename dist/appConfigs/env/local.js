"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    // "MONGO_USER": (process.env.MONGO_USER || "super"),
    // "MONGO_PASSWORD": (process.env.MONGO_PASSWORD || "hero"),
    "MONGO_PATH": (process.env.MONGO_PATH || "localhost:27017"),
    "MONGODB_DATABASE": (process.env.MONGODB_DATABASE || "superherodb"),
    "PORT": (Number(process.env.PORT) || 5000)
};
exports.default = config;
//# sourceMappingURL=local.js.map