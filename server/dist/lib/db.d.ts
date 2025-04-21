import mongoose from "mongoose";
declare class DatabaseConnection {
    private static instance;
    private retryCount;
    private maxRetries;
    private constructor();
    static getInstance(): DatabaseConnection;
    private setupEventListeners;
    private handleReconnection;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    getConnection(): mongoose.Connection;
}
export declare const databaseConnection: DatabaseConnection;
export {};
