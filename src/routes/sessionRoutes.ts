import { Router } from "express";
import sessionController from "../controllers/sessionController";

// Create a router for vector-related endpoints
const sessionRouter = Router();

sessionRouter.post("/clear", sessionController.deleteSession);
sessionRouter.get("/history", sessionController.sessionHistory);

export default sessionRouter;
