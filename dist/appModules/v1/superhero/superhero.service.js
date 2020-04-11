"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const superhero_dao_1 = __importDefault(require("./superhero.dao"));
class SuperheroService {
    getAllSuperheroes(done) {
        superhero_dao_1.default.getAllSuperheroes(done);
    }
    getSuperheroById(id, done) {
        superhero_dao_1.default.getSuperheroById(id, done);
    }
}
exports.default = new SuperheroService();
//# sourceMappingURL=superhero.service.js.map