"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
const constants_1 = require("../config/constants");
class AppError extends Error {
    constructor(message, statusCode = constants_1.StatusCodes.BAD_REQUEST, type, details) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.type = type;
        this.details = details;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
//# sourceMappingURL=app-error.js.map