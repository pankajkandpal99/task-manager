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
const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_DELAY = 5000;
class DatabaseConnectionManager {
    constructor(prismaClient) {
        this.reconnectAttempts = 0;
        this._status = "disconnected";
        this.client = prismaClient;
        this.setupEventHandlers();
    }
    get status() {
        return this._status;
    }
    set status(newStatus) {
        this._status = newStatus;
    }
    setupEventHandlers() {
        this.client.$on("error", (e) => {
            console.error("Prisma error:", e);
            this.status = "error";
        });
        process.on("SIGINT", () => __awaiter(this, void 0, void 0, function* () {
            yield this.disconnect();
            process.exit(0);
        }));
        process.on("SIGTERM", () => __awaiter(this, void 0, void 0, function* () {
            yield this.disconnect();
            process.exit(0);
        }));
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.status === "connected") {
                console.log("Database already connected");
                return;
            }
            try {
                this.status = "connecting";
                yield this.client.$connect();
                this.status = "connected";
                this.reconnectAttempts = 0;
                console.log("Database connected successfully");
            }
            catch (error) {
                this.status = "error";
                console.error("Database connection error:", error);
                if (this.reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
                    this.reconnectAttempts++;
                    console.log(`Reconnection attempt ${this.reconnectAttempts} of ${MAX_RECONNECT_ATTEMPTS} in ${RECONNECT_DELAY}ms`);
                    setTimeout(() => this.connect(), RECONNECT_DELAY);
                }
                else {
                    console.error(`Failed to connect after ${MAX_RECONNECT_ATTEMPTS} attempts`);
                    throw error;
                }
            }
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.status !== "disconnected") {
                console.log("Closing database connection...");
                yield this.client.$disconnect();
                this.status = "disconnected";
                console.log("Database disconnected successfully");
            }
        });
    }
    getClient() {
        if (this.status !== "connected") {
            throw new Error("Database not connected. Call connect() first.");
        }
        return this.client;
    }
}
const dbConnection = new DatabaseConnectionManager(prisma);
exports.default = dbConnection;
//# sourceMappingURL=db-connect.js.map