"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const superhero_model_1 = __importDefault(require("./superhero.model"));
const logger_1 = __importDefault(require("../../../logger"));
class SuperheroDao {
    getAllSuperheroes(done) {
        superhero_model_1.default.find().then((superheroes) => {
            done(null, superheroes);
        }).catch((err) => {
            logger_1.default.error("Error occured in finding superhero", err);
            done({ err });
        });
    }
    getSuperheroById(id, done) {
        superhero_model_1.default.findById(id).then((superhero) => {
            logger_1.default.info("Succesfully extracted superhero from db");
            done(null, superhero);
        }).catch((err) => {
            done({ err });
        });
    }
}
exports.default = new SuperheroDao();
//# sourceMappingURL=superhero.dao.js.map