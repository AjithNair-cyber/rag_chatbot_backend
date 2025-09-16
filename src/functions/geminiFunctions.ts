import axios from "axios";
import CONFIGS from "../config/envConfigs";

const buildGeminiPrompt = (passages: Array<any>, userQuery: string): string => {
  let context = passages
    .map(
      (p, i) =>
        `${i + 1}. Title: "${p.payload.title}"\n   Description: "${
          p.payload.description
        }"\n   URL: ${p.payload.url}`
    )
    .join("\n\n");
  return `
You are a helpful and up-to-date news assistant.
Your task is to answer the user's specific question as accurately as possible using the given news articles.

Context Passages:
Each passage contains a title, description, and a URL to the source article.
If the information in the passage is insufficient to fully answer the user's query, you may go through the provided URL for more details and then answer.. Do not add Url and Titles to the answer, it has to seperately 
shown in the sources field of the JSON response.

Passages:
${context}

User's question: "${userQuery}"

Instructions:
- Answer the question factually and concisely.
- If more information is required, go through the provided URLs.
- Always cite the title and URL of any referenced passage in your answer.
- Use hyperlinks for URLs.
- **Respond ONLY in the following JSON format (do not include extra text):**
- **Respond **only** with valid JSON in the following format:
{
  "answer": "Your detailed answer here.",
  "sources": [
    {
      "title": "Title of referenced article",
      "url": "URL of the article"
    },
    {
      "title": "Title of another referenced article",
      "url": "URL of the article"
    }
  ]
}
Do not include any text before or after the JSON.

Make sure the JSON is valid and all fields are properly filled.
`;
};

const generateGeminiResponse = async (prompt: string): Promise<string> => {
  const response = await axios.post(
    CONFIGS.GEMINI_API_URL,
    {
      contents: [{ parts: [{ text: prompt }] }],
    },
    {
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": CONFIGS.GEMINI_API_KEY, // Pass the API key in the header },
      },
    }
  );
  return response.data.candidates[0]?.content?.parts[0]?.text || "";
};

export default { buildGeminiPrompt, generateGeminiResponse };
