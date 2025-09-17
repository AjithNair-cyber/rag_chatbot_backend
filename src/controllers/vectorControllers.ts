import { Request, Response } from "express";
import jinaFunctions from "../functions/jinaFunctions";
import qdrantFunctions from "../functions/qdrantFunctions";
import geminiFunctions from "../functions/geminiFunctions";
import helperFunctions from "../functions/helperFunctions";
import redisFunctions from "../functions/redisFunctions";
import CONFIGS from "../config/envConfigs";

const getRAGResponse = async (req: Request, res: Response) => {
  try {
    const userQuery: string = req.body.query;
    const sessionId = req.session.id;
    if (!userQuery || !sessionId)
      return res.status(400).json({ error: "Query is required" });

    // 1. Embed user query
    const queryVec = await jinaFunctions.getJinaEmbeddings(userQuery);

    // 2. Search in Qdrant
    const results = await qdrantFunctions.searchQdrantByVector(queryVec);

    // Get chat history from Redis
    const history = await redisFunctions.getRedisMessages(sessionId, 2, true);
    // 3. Build Gemini prompt and get response
    const geminiPrompt = geminiFunctions.buildGeminiPrompt(
      results,
      userQuery,
      history
    );

    // Call Gemini API
    const geminiResponse = await geminiFunctions.generateGeminiResponse(
      geminiPrompt
    );

    // Parse and clean Gemini response
    const parsedResponse = helperFunctions.parseAndCleanJSON(geminiResponse);

    // 3. Return matched documents with payload (title, description, url)
    if (!parsedResponse) {
      return res.status(500).json({ error: "Invalid response from Gemini" });
    }
    // 4. Store user query in Redis
    await redisFunctions.storeRedisMessage(userQuery, sessionId, "user");
    // 5. Store Gemini response in Redis
    await redisFunctions.storeRedisMessage(
      parsedResponse.answer,
      sessionId,
      "bot"
    );

    res.json(parsedResponse);
  } catch (err) {
    res.status(500).json({ error: "Failed to process query", details: err });
  }
};

export default { getRAGResponse };
