import dotenv from "dotenv";

dotenv.config();

const CONFIGS = {
  PORT: process.env.PORT || 4000,
  NEWS_RSS_URL: [
    process.env.CNN_RSS_URL || "http://rss.cnn.com/rss/edition.rss",
    process.env.NDTV_RSS_URL ||
      "https://feeds.feedburner.com/ndtvnews-top-stories",
  ],
  JINA_API_KEY: process.env.JINA_API_KEY || "",
  JINA_API_URL: process.env.JINA_API_URL || "",
  JINA_API_MODEL: process.env.JINA_API_MODEL || "",
  QDRANT_API_KEY: process.env.QDRANT_API_KEY || "",
  QDRANT_API_URL: process.env.QDRANT_API_URL || "",
  QDRANT_DB_CLUSTER: process.env.QDRANT_DB_CLUSTER || "",
  QDRANT_DB_NAME: process.env.QDRANT_DB_NAME || "",
  REDIS_ENDPOINT: process.env.REDIS_ENDPOINT || "",
  REDIS_DATABASE_NAME: process.env.REDIS_DATABASE_NAME || "",
  REDIS_DATABASE_USERNAME: process.env.REDIS_DATABASE_USERNAME || "",
  REDIS_DATABASE_PASSWORD: process.env.REDIS_DATABASE_PASSWORD || "",
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",
  GEMINI_API_URL: process.env.GEMINI_API_URL || "",
};

export default CONFIGS;
