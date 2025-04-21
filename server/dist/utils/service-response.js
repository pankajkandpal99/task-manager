"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpResponse = void 0;
const constants_1 = require("../config/constants");
class HttpResponse {
    static send(res, data, code = constants_1.StatusCodes.OK) {
        return res.status(code).json({
            success: true,
            code,
            data,
            timestamp: new Date().toISOString(),
        });
    }
    static error(res, message, code = constants_1.StatusCodes.INTERNAL_SERVER_ERROR, options = {}) {
        var _a;
        const isProduction = process.env.NODE_ENV === "production";
        const response = {
            success: false,
            code,
            error: message,
            type: options.type,
            timestamp: new Date().toISOString(),
        };
        if (options.details) {
            response.details = Object.assign({}, options.details);
            delete response.details.stack;
        }
        if (!isProduction && options.details) {
            response.details = options.details;
        }
        if (!isProduction && options.exposeStack && ((_a = options.details) === null || _a === void 0 ? void 0 : _a.stack)) {
            response.details = Object.assign(Object.assign({}, response.details), { stack: options.details.stack });
        }
        return res.status(code).json(response);
    }
    static handleResult(res, result, successCode = constants_1.StatusCodes.OK) {
        if (result instanceof Error) {
            const statusCode = "statusCode" in result
                ? result.statusCode
                : constants_1.StatusCodes.INTERNAL_SERVER_ERROR;
            this.error(res, result.message, statusCode, {
                type: result.name,
                details: result,
                exposeStack: false,
            });
        }
        else {
            this.send(res, result, successCode);
        }
    }
}
exports.HttpResponse = HttpResponse;
//# sourceMappingURL=service-response.js.map