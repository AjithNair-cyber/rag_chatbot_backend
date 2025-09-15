import axios from "axios";
import * as cheerio from "cheerio";
import * as fs from "fs";
import { NewsItem } from "../types/rss.types";
import CONFIGS from "../config/envConfigs";

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

    const newItems: NewsItem[] = [];

    for (const URL of CONFIGS.NEWS_RSS_URL) {
      const response = await axios.get<string>(URL);
      const $ = cheerio.load(response.data, { xmlMode: true });

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

    const combinedItems = [...existingItems, ...newItems];

    fs.writeFileSync(filePath, JSON.stringify(combinedItems, null, 2), "utf-8");
    console.log(`${newItems.length} new news items added, saved to news.json`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching or saving RSS feed:", error.message);
    } else {
      console.error("Unknown error fetching or saving RSS feed");
    }
  }
}
