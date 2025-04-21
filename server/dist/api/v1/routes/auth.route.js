"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authSchema_1 = require("../../../schema/authSchema");
const api_factory_1 = require("../../../utils/api-factory");
const auth_controller_1 = require("../controllers/auth.controller");
exports.default = (router) => {
    router.post("/auth/register", (0, api_factory_1.createApiHandler)(auth_controller_1.AuthController.register, {
        bodySchema: authSchema_1.registerSchema,
        useTransaction: true,
        requireAuth: false,
    }));
    router.post("/auth/login", (0, api_factory_1.createApiHandler)(auth_controller_1.AuthController.login, {
        bodySchema: authSchema_1.loginSchema,
        useTransaction: true,
        requireAuth: false,
    }));
};
//# sourceMappingURL=auth.route.js.map