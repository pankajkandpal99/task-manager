import mongoose from "mongoose";
import { logger } from "../utils/logger";
import { env } from "../config/env";

// Define connection configurations for different environments
const connectionConfigs = {
  development: {
    url: env.DATABASE_URL,
    options: {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      retryWrites: true,
    },
  },
  production: {
    url: env.DATABASE_URL,
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
    url: env.DATABASE_URL,
    options: {
      maxPoolSize: 5,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 20000,
    },
  },
};

class DatabaseConnection {
  private static instance: DatabaseConnection;
  private retryCount = 0;
  private maxRetries = 3;

  private constructor() {
    this.setupEventListeners();
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  private setupEventListeners(): void {
    mongoose.connection.on("connected", () => {
      logger.info(
        `MongoDB connected successfully in ${env.NODE_ENV} environment`
      );
      this.retryCount = 0;
    });

    mongoose.connection.on("error", (error) => {
      logger.error(`MongoDB connection error in ${env.NODE_ENV} environment:`, {
        message: error.message,
        stack: error.stack,
      });
    });

    mongoose.connection.on("disconnected", () => {
      logger.warn(`MongoDB disconnected in ${env.NODE_ENV} environment`);
      this.handleReconnection();
    });
  }

  private async handleReconnection(): Promise<void> {
    if (this.retryCount < this.maxRetries) {
      this.retryCount++;
      logger.info(
        `Attempting MongoDB reconnection (attempt ${this.retryCount})`
      );

      try {
        await this.connect();
      } catch (error) {
        setTimeout(() => this.handleReconnection(), 5000);
      }
    } else {
      logger.error("Maximum MongoDB reconnection attempts reached");
      process.exit(1);
    }
  }

  public async connect(): Promise<void> {
    const config =
      connectionConfigs[env.NODE_ENV as keyof typeof connectionConfigs];

    if (!config) {
      throw new Error(`Unsupported environment: ${env.NODE_ENV}`);
    }

    try {
      // Validate connection URL
      if (!config.url) {
        throw new Error("Database URL is not defined");
      }

      await mongoose.connect(config.url, {
        ...config.options,
        // Additional security and performance options
        autoIndex: env.NODE_ENV !== "production", // Disable in production
        bufferCommands: false, // Fail fast if no connection
      });

      // Optional: Log connection details securely
      logger.info(`Database connection established`, {
        environment: env.NODE_ENV,
        host: mongoose.connection.host,
      });
    } catch (error) {
      logger.error("Failed to connect to MongoDB", {
        environment: env.NODE_ENV,
        error: error instanceof Error ? error.message : "Unknown error",
      });
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      logger.info(
        `MongoDB disconnected gracefully from ${env.NODE_ENV} environment`
      );
    } catch (error) {
      logger.error("Error during MongoDB disconnection", {
        environment: env.NODE_ENV,
        error: error instanceof Error ? error.message : "Unknown error",
      });
      process.exit(1);
    }
  }

  public getConnection(): mongoose.Connection {
    return mongoose.connection;
  }
}

export const databaseConnection = DatabaseConnection.getInstance();
