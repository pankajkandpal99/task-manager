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
exports.validateRequest = void 0;
const zod_1 = require("zod");
const constants_1 = require("../config/constants");
const service_response_1 = require("../utils/service-response");
const validateRequest = (schemas) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (schemas.body) {
                req.body = yield schemas.body.parseAsync(req.body);
            }
            if (schemas.query) {
                req.query = yield schemas.query.parseAsync(req.query);
            }
            if (schemas.params) {
                req.params = yield schemas.params.parseAsync(req.params);
            }
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                service_response_1.HttpResponse.error(res, "Validation Error", constants_1.StatusCodes.BAD_REQUEST, error.errors);
            }
            else {
                next(error);
            }
        }
    });
};
exports.validateRequest = validateRequest;
//# sourceMappingURL=validation.js.map