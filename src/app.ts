import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { getJinaEmbeddings } from "./functions/jinaFunctions";
import { searchQdrantByVector } from "./functions/qdrantFunctions";
import { fetchAndSaveRSS } from "./service/scrappingService";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  await fetchAndSaveRSS();
  res.send("Hello rom Expes + TyScrpt!");
});

app.post("/query", async (req, res) => {
  try {
    const userQuery: string = req.body.query;
    if (!userQuery) return res.status(400).json({ error: "Query is required" });

    // 1. Embed user query
    const queryVec = await getJinaEmbeddings(userQuery);

    // 2. Search in Qdrant
    const results = await searchQdrantByVector(queryVec);

    // 3. Return matched documents with payload (title, description, url)
    res.json({
      results: results.map((hit) => ({
        id: hit.id,
        score: hit.score,
        ...hit.payload,
      })),
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to process query", details: err });
  }
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

export default app;
