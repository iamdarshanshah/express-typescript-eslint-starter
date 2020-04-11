"use strict";
/**
 * @file Creates a Class SuperheroController that will orchestrate the service methods to be invoked.
 * @this SuperheroController
 * @exports SuperheroController
 *
 * @author Darshan Shah
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const superhero_1 = __importDefault(require("../../../../appModules/v1/superhero"));
class SuperheroController {
    getAllSuperheroes(done) {
        superhero_1.default.getAllSuperheroes(done);
    }
    getSuperheroById(id, done) {
        superhero_1.default.getSuperheroById(id, done);
    }
}
exports.default = new SuperheroController();
//# sourceMappingURL=superhero.controller.js.map