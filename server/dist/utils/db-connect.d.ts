type ConnectionStatus = "disconnected" | "connecting" | "connected" | "error";
interface DBConnectionManager {
    status: ConnectionStatus;
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
    getClient: () => PrismaClient;
}
declare class DatabaseConnectionManager implements DBConnectionManager {
    private client;
    private reconnectAttempts;
    private _status;
    constructor(prismaClient: PrismaClient);
    get status(): ConnectionStatus;
    private set status(value);
    private setupEventHandlers;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    getClient(): PrismaClient;
}
declare const dbConnection: DatabaseConnectionManager;
export default dbConnection;
