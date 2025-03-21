
type ConnectionStatus = "disconnected" | "connecting" | "connected" | "error";

interface DBConnectionManager {
  status: ConnectionStatus;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  getClient: () => PrismaClient;
}

const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_DELAY = 5000;

class DatabaseConnectionManager implements DBConnectionManager {
  private client: PrismaClient;
  private reconnectAttempts: number = 0;
  private _status: ConnectionStatus = "disconnected";

  constructor(prismaClient: PrismaClient) {
    this.client = prismaClient;
    this.setupEventHandlers();
  }

  get status(): ConnectionStatus {
    return this._status;
  }

  private set status(newStatus: ConnectionStatus) {
    this._status = newStatus;
  }

  private setupEventHandlers(): void {
    // Set up Prisma event handlers
    this.client.$on("error", (e: Error) => {
      console.error("Prisma error:", e);
      this.status = "error";
    });

    // Set up process shutdown handlers
    process.on("SIGINT", async () => {
      await this.disconnect();
      process.exit(0);
    });

    process.on("SIGTERM", async () => {
      await this.disconnect();
      process.exit(0);
    });
  }

  public async connect(): Promise<void> {
    if (this.status === "connected") {
      console.log("Database already connected");
      return;
    }

    try {
      this.status = "connecting";
      await this.client.$connect();
      this.status = "connected";
      this.reconnectAttempts = 0;
      console.log("Database connected successfully");
    } catch (error) {
      this.status = "error";
      console.error("Database connection error:", error);

      if (this.reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
        this.reconnectAttempts++;
        console.log(
          `Reconnection attempt ${this.reconnectAttempts} of ${MAX_RECONNECT_ATTEMPTS} in ${RECONNECT_DELAY}ms`
        );
        setTimeout(() => this.connect(), RECONNECT_DELAY);
      } else {
        console.error(
          `Failed to connect after ${MAX_RECONNECT_ATTEMPTS} attempts`
        );
        throw error;
      }
    }
  }

  public async disconnect(): Promise<void> {
    if (this.status !== "disconnected") {
      console.log("Closing database connection...");
      await this.client.$disconnect();
      this.status = "disconnected";
      console.log("Database disconnected successfully");
    }
  }

  public getClient(): PrismaClient {
    if (this.status !== "connected") {
      throw new Error("Database not connected. Call connect() first.");
    }
    return this.client;
  }
}

const dbConnection = new DatabaseConnectionManager(prisma);

export default dbConnection;
