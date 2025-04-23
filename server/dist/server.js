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
const app_1 = require("./app");
const env_1 = require("./config/env");
const db_1 = require("./lib/db");
const logger_1 = require("./utils/logger");
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const app = yield (0, app_1.createApp)();
        yield db_1.databaseConnection.connect();
        const server = app.listen(env_1.env.PORT, () => {
            logger_1.logger.info(`Server running in ${env_1.env.NODE_ENV} mode on port ${env_1.env.PORT}`);
        });
        process.on("SIGTERM", () => {
            logger_1.logger.info("SIGTERM received: closing server");
            server.close(() => __awaiter(void 0, void 0, void 0, function* () {
                yield db_1.databaseConnection.disconnect();
                logger_1.logger.info("Server closed");
                process.exit(0);
            }));
        });
    }
    catch (error) {
        logger_1.logger.error("Failed to start server:", error);
        process.exit(1);
    }
});
startServer();
//# sourceMappingURL=server.js.map