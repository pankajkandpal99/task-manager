"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponseService = void 0;
class ApiResponseService {
    static success(res, data, message = "Success", statusCode = 200) {
        res.status(statusCode).json({
            success: true,
            message,
            data,
        });
    }
    static error(res, message = "Error occurred", statusCode = 500, errors) {
        res.status(statusCode).json({
            success: false,
            message,
            errors,
        });
    }
    static unauthorized(res, message = "Unauthorized") {
        this.error(res, message, 401);
    }
    static forbidden(res, message = "Forbidden") {
        this.error(res, message, 403);
    }
}
exports.ApiResponseService = ApiResponseService;
//# sourceMappingURL=response.service.js.map