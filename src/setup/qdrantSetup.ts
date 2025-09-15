import { QdrantClient } from "@qdrant/js-client-rest";
import CONFIGS from "../config/envConfigs";

const qdrant = new QdrantClient({
  url: CONFIGS.QDRANT_API_URL,
  apiKey: CONFIGS.QDRANT_API_KEY,
});

export default qdrant;
