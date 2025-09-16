import express from "express";
// import cors from "cors";
import vectorRouter from "./routes/vectorRoute";
import errorHandler from "./middlewares/errorHandler";

// Initialize Express app
const app = express();

// Middleware
// app.use(cors());
app.use(express.json());

// Routes
app.use("/vectors", vectorRouter);

// Error Handling Middleware
app.use(errorHandler);

export default app;
