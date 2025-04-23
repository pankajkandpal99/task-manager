"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_service_1 = require("../services/response.service");
const env_1 = require("../config/env");
const requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith("Bearer "))) {
        return response_service_1.ApiResponseService.error(res, "Unauthorized", 401);
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_1.env.JWT_SECRET);
        req.context.user = {
            id: decoded.userId,
            email: decoded.email || "",
            role: decoded.role || "USER",
        };
        next();
    }
    catch (err) {
        console.log("error inside token catch ");
        if (err instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return response_service_1.ApiResponseService.error(res, "Token expired", 401);
        }
        if (err instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return response_service_1.ApiResponseService.error(res, "Invalid token", 403);
        }
        return response_service_1.ApiResponseService.error(res, "Authentication failed", 500);
    }
};
exports.requireAuth = requireAuth;
//# sourceMappingURL=auth.js.map