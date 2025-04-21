"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const error_handler_1 = require("../../../error-handler");
const user_model_1 = require("../../../models/user.model");
const service_response_1 = require("../../../utils/service-response");
exports.UserController = {
    getCurrentUser: (context) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield context.withTransaction((session) => __awaiter(void 0, void 0, void 0, function* () {
                var _a;
                const user = yield user_model_1.User.findById((_a = context.user) === null || _a === void 0 ? void 0 : _a.id)
                    .session(session)
                    .select("-password -__v");
                if (!user) {
                    throw new error_handler_1.NotFoundError("User not found");
                }
                return user.toObject();
            }));
            return service_response_1.HttpResponse.send(context.res, result, 200);
        }
        catch (error) {
            throw error;
        }
    }),
};
//# sourceMappingURL=user.controller.js.map