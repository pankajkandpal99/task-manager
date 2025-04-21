"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictError = exports.NotFoundError = exports.AuthenticationError = exports.ValidationError = void 0;
const constants_1 = require("../config/constants");
const app_error_1 = require("./app-error");
class ValidationError extends app_error_1.AppError {
    constructor(message = "Validation Error", details) {
        super(message, constants_1.StatusCodes.BAD_REQUEST, "ValidationError", details);
    }
}
exports.ValidationError = ValidationError;
class AuthenticationError extends app_error_1.AppError {
    constructor(message = "Authentication Failed", details) {
        super(message, constants_1.StatusCodes.UNAUTHORIZED, "AuthenticationError", details);
    }
}
exports.AuthenticationError = AuthenticationError;
class NotFoundError extends app_error_1.AppError {
    constructor(message = "Resource Not Found", details) {
        super(message, constants_1.StatusCodes.NOT_FOUND, "NotFoundError", details);
    }
}
exports.NotFoundError = NotFoundError;
class ConflictError extends app_error_1.AppError {
    constructor(message = "Resource Already Exists", details) {
        super(message, constants_1.StatusCodes.CONFLICT, "ConflictError", details);
    }
}
exports.ConflictError = ConflictError;
//# sourceMappingURL=index.js.map