"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description Defines the model and schema to used by mongoose.
 * @exports superheroModel
 */
const mongoose_1 = __importDefault(require("mongoose"));
const superheroSchema = new mongoose_1.default.Schema({
    name: String,
    power: String,
    universe: String,
});
const superheroModel = mongoose_1.default.model("Superhero", superheroSchema);
exports.default = superheroModel;
//# sourceMappingURL=superhero.model.js.map