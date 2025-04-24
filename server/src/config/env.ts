import dotenv from "dotenv";

dotenv.config();

interface Config {
  PORT: number;
  MONGODB_URI: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  NODE_ENV: string;
  CLIENT_URL: string;
  MY_BACKEND_URL: string;
}

const config: Config = {
  PORT: parseInt(process.env.PORT || "5000"),
  MONGODB_URI: process.env.MONGODB_URI || "",
  JWT_SECRET: process.env.JWT_SECRET || "your-secret-key",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d",
  NODE_ENV: process.env.NODE_ENV || "development",
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",
  MY_BACKEND_URL: process.env.MY_BACKEND_URL || "http://localhost:8080",
};

export default config;
