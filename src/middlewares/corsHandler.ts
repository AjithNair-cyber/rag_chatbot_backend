import cors from "cors";
import CONFIGS from "../config/envConfigs";

export const corsMiddleware = cors({
  origin: CONFIGS.UI_URL, // or '*' for testing
  methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});
