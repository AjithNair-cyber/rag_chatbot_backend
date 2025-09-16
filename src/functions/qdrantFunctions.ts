import CONFIGS from "../config/envConfigs";
import qdrant from "../setup/qdrantSetup";
import { QdrantInsertPayload } from "../types/rss.types";

// Function to upsert vectors into Qdrant
const upsertVectors = async (points: QdrantInsertPayload[]) => {
  // Upsert points to Qdrant
  await qdrant.upsert(CONFIGS.QDRANT_DB_NAME, {
    wait: true,
    points,
  });

  // Log success message
  console.log("Vectors upserted to Qdrant");
};

// Function to scroll through points in Qdrant
const scrollPoints = async () => {
  // Scroll through points in Qdrant to retrieve data
  const result = await qdrant.scroll(CONFIGS.QDRANT_DB_NAME, {
    limit: 10,
    with_payload: true,
  });
  return result;
};

// Function to search Qdrant by vector similarity
const searchQdrantByVector = async (vector: number[]) => {
  // Search Qdrant for similar vectors with threshold and limit
  const searchResult = await qdrant.search(CONFIGS.QDRANT_DB_NAME, {
    vector: vector,
    score_threshold: 0.45,
    limit: 5,
  });
  return searchResult;
};

export default { upsertVectors, scrollPoints, searchQdrantByVector };
