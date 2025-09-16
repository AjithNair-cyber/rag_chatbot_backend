import axios from "axios";
import CONFIGS from "../config/envConfigs";

// FUNCTION TO GET EMBEDDINGS FROM JINA
const getJinaEmbeddings = async (texts: string): Promise<number[]> => {
  try {
    // Call Jina API to get embeddings
    const response = await axios.post(
      CONFIGS.JINA_API_URL,
      { input: texts, model: CONFIGS.JINA_API_MODEL },
      { headers: { Authorization: `Bearer ${CONFIGS.JINA_API_KEY}` } }
    );
    return response.data.data[0].embedding;
  } catch (err: any) {
    // BREAK THE EXECUTION IF ERROR
    console.error("Error fetching embeddings from Jina:", err?.message);
    throw err;
  }
};

export default { getJinaEmbeddings };
