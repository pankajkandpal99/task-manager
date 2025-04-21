"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_factory_1 = require("../../../utils/api-factory");
const user_controller_1 = require("../controllers/user.controller");
exports.default = (router) => {
    router.get("/users/me", (0, api_factory_1.createApiHandler)(user_controller_1.UserController.getCurrentUser, {
        useTransaction: true,
        requireAuth: true,
    }));
};
//# sourceMappingURL=user.route.js.map