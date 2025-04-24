import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import routes from "./routes/index";
import errorHandler from "./middlewares/error.middleware";
import config from "@config/env";
import connectDB from "./lib/db";

const app = express();
connectDB();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: config.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// CORS configuration

// Routes
app.use("/api/v1", routes);

app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});

export default app;
