import { Request, Response } from "express";
import jinaFunctions from "../functions/jinaFunctions";
import qdrantFunctions from "../functions/qdrantFunctions";
import geminiFunctions from "../functions/geminiFunctions";
import helperFunctions from "../functions/helperFunctions";
import CONFIGS from "../config/envConfigs";

const getRAGResponse = async (req: Request, res: Response) => {
  try {
    console.log(CONFIGS);
    const userQuery: string = req.body.query;
    if (!userQuery) return res.status(400).json({ error: "Query is required" });

    // 1. Embed user query
    const queryVec = await jinaFunctions.getJinaEmbeddings(userQuery);

    // 2. Search in Qdrant
    const results = await qdrantFunctions.searchQdrantByVector(queryVec);

    // 3. Build Gemini prompt and get response
    const geminiPrompt = geminiFunctions.buildGeminiPrompt(results, userQuery);

    // Call Gemini API
    const geminiResponse = await geminiFunctions.generateGeminiResponse(
      geminiPrompt
    );

    // Parse and clean Gemini response
    const parsedResponse = helperFunctions.parseAndCleanJSON(geminiResponse);

    // 3. Return matched documents with payload (title, description, url)
    if (!parsedResponse)
      return res.status(500).json({ error: "Invalid response from Gemini" });
    res.json(parsedResponse);
  } catch (err) {
    res.status(500).json({ error: "Failed to process query", details: err });
  }
};

export default { getRAGResponse };
