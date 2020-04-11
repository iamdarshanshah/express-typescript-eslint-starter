"use strict";
/**
 * @file Creates a Class SuperheroRouter that will initialize all the routes.
 * @this SuperheroRouter
 * @exports SuperheroRouter
 *
 * @author Darshan Shah
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const superhero_model_1 = __importDefault(require("../../../../appModules/v1/superhero/superhero.model"));
const HttpException_1 = __importDefault(require("../../../../common/exceptions/HttpException"));
const superhero_controller_1 = __importDefault(require("./superhero.controller"));
class SuperheroRouter {
    /**
     * @constructor
     */
    constructor() {
        this.path = "/superheroes";
        this.router = express_1.default.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(this.path, this.getAllSuperheroes);
        this.router.get(`${this.path}/:id`, this.getSuperheroById);
        this.router.post(this.path, this.createSuperhero);
    }
    /**
     *
     * @param request
     * @param response
     * @param next
     */
    getAllSuperheroes(request, response, next) {
        superhero_controller_1.default.getAllSuperheroes((err, result) => {
            if (err) {
                next(new HttpException_1.default(404, "no superheroes found"));
            }
            else {
                response.status(200).send(result);
            }
        });
    }
    /**
     *
     * @param request
     * @param response
     * @param next
     */
    getSuperheroById(request, response, next) {
        const id = (String)(new mongoose_1.default.Types.ObjectId(request.params.id));
        superhero_controller_1.default.getSuperheroById(id, (err, result) => {
            if (err) {
                next(new HttpException_1.default(404, "no superheroes found for the given id"));
            }
            else {
                response.status(200).send(result);
            }
        });
    }
    createSuperhero(request, response, next) {
        const superhero = request.body;
        superhero_model_1.default
            .create(superhero)
            .then((res) => {
            if (res)
                response.status(200).send(res);
            else
                next(new HttpException_1.default(500, "Internal server error"));
        });
    }
}
exports.default = SuperheroRouter;
//# sourceMappingURL=superhero.router.js.map