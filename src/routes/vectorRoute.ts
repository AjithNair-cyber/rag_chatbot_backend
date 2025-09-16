import { Router } from "express";
import vectorControllers from "../controllers/vectorControllers";

// Create a router for vector-related endpoints
const vectorRouter = Router();

// Define a POST endpoint for querying RAG responses
vectorRouter.post("/query", vectorControllers.getRAGResponse);

export default vectorRouter;
