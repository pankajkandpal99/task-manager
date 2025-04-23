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
exports.databaseConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = require("../utils/logger");
const env_1 = require("../config/env");
const connectionConfigs = {
    development: {
        url: env_1.env.DATABASE_URL,
        options: {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
            retryWrites: true,
        },
    },
    production: {
        url: env_1.env.DATABASE_URL,
        options: {
            maxPoolSize: 50,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 30000,
            retryWrites: true,
            ssl: true,
            sslValidate: true,
        },
    },
    test: {
        url: env_1.env.DATABASE_URL,
        options: {
            maxPoolSize: 5,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 20000,
        },
    },
};
class DatabaseConnection {
    constructor() {
        this.retryCount = 0;
        this.maxRetries = 3;
        this.setupEventListeners();
    }
    static getInstance() {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
        }
        return DatabaseConnection.instance;
    }
    setupEventListeners() {
        mongoose_1.default.connection.on("connected", () => {
            logger_1.logger.info(`MongoDB connected successfully in ${env_1.env.NODE_ENV} environment`);
            this.retryCount = 0;
        });
        mongoose_1.default.connection.on("error", (error) => {
            logger_1.logger.error(`MongoDB connection error in ${env_1.env.NODE_ENV} environment:`, {
                message: error.message,
                stack: error.stack,
            });
        });
        mongoose_1.default.connection.on("disconnected", () => {
            logger_1.logger.warn(`MongoDB disconnected in ${env_1.env.NODE_ENV} environment`);
            this.handleReconnection();
        });
    }
    handleReconnection() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.retryCount < this.maxRetries) {
                this.retryCount++;
                logger_1.logger.info(`Attempting MongoDB reconnection (attempt ${this.retryCount})`);
                try {
                    yield this.connect();
                }
                catch (error) {
                    setTimeout(() => this.handleReconnection(), 5000);
                }
            }
            else {
                logger_1.logger.error("Maximum MongoDB reconnection attempts reached");
                process.exit(1);
            }
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            const config = connectionConfigs[env_1.env.NODE_ENV];
            if (!config) {
                throw new Error(`Unsupported environment: ${env_1.env.NODE_ENV}`);
            }
            try {
                if (!config.url) {
                    throw new Error("Database URL is not defined");
                }
                yield mongoose_1.default.connect(config.url, Object.assign(Object.assign({}, config.options), { autoIndex: env_1.env.NODE_ENV !== "production", bufferCommands: false }));
                logger_1.logger.info(`Database connection established`, {
                    environment: env_1.env.NODE_ENV,
                    host: mongoose_1.default.connection.host,
                });
            }
            catch (error) {
                logger_1.logger.error("Failed to connect to MongoDB", {
                    environment: env_1.env.NODE_ENV,
                    error: error instanceof Error ? error.message : "Unknown error",
                });
                throw error;
            }
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoose_1.default.disconnect();
                logger_1.logger.info(`MongoDB disconnected gracefully from ${env_1.env.NODE_ENV} environment`);
            }
            catch (error) {
                logger_1.logger.error("Error during MongoDB disconnection", {
                    environment: env_1.env.NODE_ENV,
                    error: error instanceof Error ? error.message : "Unknown error",
                });
                process.exit(1);
            }
        });
    }
    getConnection() {
        return mongoose_1.default.connection;
    }
}
exports.databaseConnection = DatabaseConnection.getInstance();
//# sourceMappingURL=db.js.map