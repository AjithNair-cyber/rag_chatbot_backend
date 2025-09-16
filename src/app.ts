import express from "express";
import cors from "cors";
import vectorRouter from "./routes/vectorRoute";
import errorHandler from "./middlewares/errorHandler";
import CONFIGS from "./config/envConfigs";

// Initialize Express app
const app = express();

// Middleware
app.use(
  cors({
    origin: CONFIGS.UI_URL, // or '*' for testing
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Routes
app.use("/vectors", vectorRouter);

// Error Handling Middleware
app.use(errorHandler);

export default app;
