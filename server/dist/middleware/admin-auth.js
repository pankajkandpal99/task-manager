"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = void 0;
const response_service_1 = require("../services/response.service");
const requireAdmin = (req, res, next) => {
    var _a;
    if (!((_a = req.context) === null || _a === void 0 ? void 0 : _a.user)) {
        return response_service_1.ApiResponseService.error(res, "Authentication required", 401);
    }
    if (req.context.user.role !== "ADMIN") {
        return response_service_1.ApiResponseService.error(res, "Admin access required", 403);
    }
    next();
};
exports.requireAdmin = requireAdmin;
//# sourceMappingURL=admin-auth.js.map