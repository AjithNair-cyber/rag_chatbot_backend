import { QueryResult } from "../types/rss.types";

const parseAndCleanJSON = (input: string): QueryResult | null => {
  try {
    const cleanedInput = input.replace(/```json\s*|```\s*$/g, "").trim();
    return JSON.parse(cleanedInput);
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return null;
  }
};
export default { parseAndCleanJSON };
