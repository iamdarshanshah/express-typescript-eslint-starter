"use strict";
/**
 * @description Error handler middleware, sends error response to client.
 * @exports errorMiddleware
 */
Object.defineProperty(exports, "__esModule", { value: true });
function errorMiddleware(error, request, response, next) {
    const status = error.status || 500;
    const message = error.message || "Something went wrong";
    response
        .status(status)
        .send({
        status,
        message,
    });
    next({ "err": message });
}
exports.default = errorMiddleware;
//# sourceMappingURL=httpErrorHandler.middleware.js.map