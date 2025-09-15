import { NewsItem } from "../types/rss.types";
import { getJinaEmbeddings } from "../functions/jinaFunctions";
import { upsertVectors } from "../functions/qdrantFunctions";
import { v4 as uuidv4 } from "uuid";

// Function to embed articles and insert into Qdrant
export async function embedAndInsertArticles(articles: NewsItem[]) {
  // Embed each article (title + description) and prepare payload for Qdrant
  const texts = articles.map((a) => `${a.title} ${a.description}`);

  // Array to hold embeddings
  const embeddings: number[][] = [];

  // Get embeddings for each text and store in embeddings array
  for (const text of texts) {
    const embedding = await getJinaEmbeddings(text);
    embeddings.push(embedding);
  }

  // Prepare points for Qdrant
  const points = articles.map((article, idx) => ({
    id: uuidv4(), // Use a number for id to match QdrantInsertPayload type
    vector: embeddings[idx], // embedding should be number[]
    payload: {
      title: article.title,
      description: article.description,
      url: article.link,
    },
  }));

  // Batch upsert all points at once
  await upsertVectors(points);
}
