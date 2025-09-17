import { Request, Response } from "express";
import redisClient from "../setup/redisSetup";
import redisFunctions from "../functions/redisFunctions";

const deleteSession = async (req: Request, res: Response) => {
  const sessionId = req.session.id;

  if (!sessionId) {
    return res.status(400).json({ error: "Session not found." });
  }

  try {
    // 1. Delete the chat history from Redis
    // This is a separate key from the session data, so it must be deleted explicitly.
    await redisClient.del(`chat-history:${sessionId}`);

    // 2. Destroy the session itself using the built-in express-session method
    // This action also triggers connect-redis to delete the session key from the database.
    req.session.destroy((err) => {
      if (err) {
        console.error("Session destruction error:", err);
        return res.status(500).json({ error: "Failed to clear session." });
      }

      // 3. Clear the session cookie from the user's browser
      res.clearCookie("connect.sid");

      res
        .status(200)
        .json({ message: "Session and history cleared successfully." });
    });
  } catch (error) {
    console.error("Failed to clear session from Redis:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

const sessionHistory = async (req: Request, res: Response) => {
  const sessionId = req.session.id;

  if (!sessionId) {
    return res
      .status(400)
      .json({ error: "Session not found. Please start a new session." });
  }

  try {
    // 1. Fetch all elements from the sorted set for the given session ID
    // ZRANGE fetches elements from the sorted set
    const history = await redisFunctions.getRedisMessages(sessionId, -1, false);
    // 2. Parse the JSON string values into an array of message objects
    const chatHistory = history.map((message) => JSON.parse(message));

    res.status(200).json({ history: chatHistory });
  } catch (error) {
    console.error("Failed to fetch chat history from Redis:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export default { deleteSession, sessionHistory };
