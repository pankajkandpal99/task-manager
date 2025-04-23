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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const bcryptjs_1 = require("bcryptjs");
const env_1 = require("../../../config/env");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../../../models/user.model");
const error_handler_1 = require("../../../error-handler");
const service_response_1 = require("../../../utils/service-response");
const generateToken = (userId, role) => jsonwebtoken_1.default.sign({ userId, role }, env_1.env.JWT_SECRET, { expiresIn: "7d" });
const hashPassword = (password) => (0, bcryptjs_1.hash)(password, 12);
exports.AuthController = {
    register: (context) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield context.withTransaction((session) => __awaiter(void 0, void 0, void 0, function* () {
                const { email, password, phoneNumber } = context.body;
                const existingUser = yield user_model_1.User.findOne({ phoneNumber }).session(session);
                if (existingUser) {
                    throw new error_handler_1.ConflictError("Phone number already registered", {
                        field: "phoneNumber",
                        value: phoneNumber,
                    });
                }
                if (email) {
                    const existingEmail = yield user_model_1.User.findOne({ email }).session(session);
                    if (existingEmail) {
                        throw new error_handler_1.ConflictError("Email already registered", {
                            field: "email",
                            value: email,
                        });
                    }
                }
                const hashedPassword = yield hashPassword(password);
                const user = new user_model_1.User(Object.assign({ phoneNumber, password: hashedPassword, role: "USER" }, (email && { email })));
                yield user.save({ session });
                return Object.assign({ id: user._id.toString(), phoneNumber: user.phoneNumber, role: user.role }, (user.email && { email: user.email }));
            }));
            return service_response_1.HttpResponse.send(context.res, result, 201);
        }
        catch (error) {
            throw error;
        }
    }),
    login: (context) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield context.withTransaction((session) => __awaiter(void 0, void 0, void 0, function* () {
                const { email, phoneNumber, password } = context.body;
                if (email && phoneNumber) {
                    throw new error_handler_1.AuthenticationError("Provide either email or phone number, not both");
                }
                const user = yield user_model_1.User.findOne({
                    $or: [
                        ...(email ? [{ email: email.toLowerCase() }] : []),
                        ...(phoneNumber ? [{ phoneNumber }] : []),
                    ],
                })
                    .select("+password")
                    .session(session);
                if (!user) {
                    throw new error_handler_1.AuthenticationError("Invalid credentials");
                }
                const isPasswordValid = yield (0, bcryptjs_1.compare)(password, user.password);
                if (!isPasswordValid) {
                    throw new error_handler_1.AuthenticationError("Invalid credentials");
                }
                const token = generateToken(user._id.toString(), user.role);
                context.res.cookie("token", token, {
                    httpOnly: false,
                    secure: env_1.env.NODE_ENV === "production" ? true : false,
                    sameSite: env_1.env.NODE_ENV === "production" ? "none" : "lax",
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                    domain: env_1.env.NODE_ENV === "production" ? env_1.env.COOKIE_DOMAIN : "localhost",
                    path: "/",
                });
                const userObject = user.toObject();
                delete userObject.password;
                delete userObject.__v;
                return {
                    user: userObject,
                };
            }));
            return service_response_1.HttpResponse.send(context.res, result, 200);
        }
        catch (error) {
            throw error;
        }
    }),
};
//# sourceMappingURL=auth.controller.js.map