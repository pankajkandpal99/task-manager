"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
const constants_1 = require("../config/constants");
const logger_1 = require("../utils/logger");
const service_response_1 = require("../utils/service-response");
const app_error_1 = require("./app-error");
const _1 = require(".");
const errorHandler = (err, req, res, next) => {
    logger_1.logger.error(`[${req.method}] ${req.path} >> ${err instanceof Error ? err.stack : err}`);
    if (err instanceof _1.ConflictError) {
        return service_response_1.HttpResponse.error(res, err.message, err.statusCode, {
            type: err.name,
            details: Object.assign(Object.assign({}, err.details), (process.env.NODE_ENV !== "production" &&
                {})),
        });
    }
    if (err instanceof zod_1.ZodError) {
        return service_response_1.HttpResponse.error(res, "Validation Error", constants_1.StatusCodes.BAD_REQUEST, {
            type: "ValidationError",
            details: err.errors.map((e) => ({
                path: e.path.join("."),
                message: e.message,
            })),
        });
    }
    if (err instanceof Error && err.name === "JsonWebTokenError") {
        return service_response_1.HttpResponse.error(res, "Invalid Token", constants_1.StatusCodes.UNAUTHORIZED, {
            type: "AuthenticationError",
        });
    }
    if (err instanceof app_error_1.AppError) {
        return service_response_1.HttpResponse.error(res, err.message, err.statusCode, {
            type: err.type || err.name,
            details: err.details,
        });
    }
    if (err instanceof Error) {
        return service_response_1.HttpResponse.error(res, process.env.NODE_ENV === "production"
            ? "Internal Server Error"
            : err.message, constants_1.StatusCodes.INTERNAL_SERVER_ERROR, {
            type: "InternalError",
            details: process.env.NODE_ENV === "production" ? undefined : err,
            exposeStack: true,
        });
    }
    return service_response_1.HttpResponse.error(res, "Unknown Error Occurred", constants_1.StatusCodes.INTERNAL_SERVER_ERROR);
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error-handler.js.map