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
exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const context_1 = require("./middleware/context");
const routes_1 = __importDefault(require("./api/v1/routes"));
const db_1 = require("./lib/db");
const error_handler_1 = require("./error-handler/error-handler");
const corsOptions_1 = require("./config/corsOptions");
const path_1 = __importDefault(require("path"));
const createApp = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    const db = db_1.databaseConnection.getConnection();
    app.use(express_1.default.json());
    app.use((0, cors_1.default)(corsOptions_1.corsOptions));
    app.use((0, cookie_parser_1.default)());
    app.use((0, helmet_1.default)());
    app.use((0, context_1.contextMiddleware)(db));
    const uploadsPath = path_1.default.join(__dirname, "../uploads");
    app.use("/uploads", (0, cors_1.default)(corsOptions_1.staticCorsOptions), express_1.default.static(uploadsPath, {
        setHeaders: (res, path) => {
            res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
            res.setHeader("Cache-Control", "public, max-age=31536000");
        },
    }));
    app.use("/api/v1", routes_1.default);
    app.use(error_handler_1.errorHandler);
    return app;
});
exports.createApp = createApp;
//# sourceMappingURL=app.js.map