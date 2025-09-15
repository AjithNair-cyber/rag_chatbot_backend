import axios from "axios";
import * as cheerio from "cheerio";
import * as fs from "fs";
import { NewsItem } from "../types/rss.types";
import CONFIGS from "../config/envConfigs";
import { embedAndInsertArticles } from "./vectorControllers";

// Function to fetch RSS feeds, parse, embed, and save to news.json for local storage
export async function fetchAndSaveRSS(): Promise<void> {
  try {
    // Read existing news.json if exists
    let existingItems: NewsItem[] = [];
    const filePath = "./src/data/news.json";

    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf-8");
      existingItems = fileData ? JSON.parse(fileData) : [];
    }

    // Create a Set of existing GUIDs for quick lookup
    const existingGuids = new Set(existingItems.map((item) => item.guid));

    // Declare array to hold new items
    const newItems: NewsItem[] = [];

    // Fetch and parse each RSS feed URL
    // Have 2 now can extend in future by adding more URLs in envConfigs.ts
    for (const URL of CONFIGS.NEWS_RSS_URL) {
      // Fetch RSS feed data
      const response = await axios.get<string>(URL);

      // Parse XML using cheerio
      const $ = cheerio.load(response.data, { xmlMode: true });

      // Extract items and filter out duplicates using GUID
      // Loop through each item in the RSS feed
      $("item").each((_, elem) => {
        const guid = $(elem).find("guid").text();
        if (!existingGuids.has(guid)) {
          // Only add if not already existing
          newItems.push({
            title: $(elem).find("title").text(),
            link: $(elem).find("link").text(),
            description: $(elem).find("description").text(),
            pubDate: $(elem).find("pubDate").text(),
            guid: guid,
          });
          existingGuids.add(guid); // add to the set to avoid duplicates in the same run
        }
      });
    }

    // Combine existing and new items, embed new ones, and save back to news.json
    const combinedItems = [...existingItems, ...newItems];

    // Embed and insert only the new articles to Qdrant
    if (newItems.length > 0) {
      await embedAndInsertArticles(newItems);
    }

    // Save combined items back to news.json
    fs.writeFileSync(filePath, JSON.stringify(combinedItems, null, 2));

    // Log the number of new items added
    console.log(`${newItems.length} new news items added, saved to news.json`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching or saving RSS feed:", error.message);
    } else {
      console.error("Unknown error fetching or saving RSS feed");
    }
  }
}
