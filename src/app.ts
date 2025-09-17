import express from "express";
import sessionRouter from "./routes/sessionRoutes";
import vectorRouter from "./routes/vectorRoute";
import errorHandler from "./middlewares/errorHandler";
import { corsMiddleware } from "./middlewares/corsHandler";
import { expressRedisSession } from "./middlewares/sessionHandler";
// Initialize Express app
const app = express();

// Middleware
app.use(corsMiddleware);
app.use(express.json());
app.use(expressRedisSession);
// Routes
app.use("/vectors", vectorRouter);
app.use("/session", sessionRouter);

// Error Handling Middleware
app.use(errorHandler);

export default app;
