import redisClient from "../setup/redisSetup";

// Function to store redis Message
const storeRedisMessage = async (
  query: string,
  sessionId: string,
  type: string
) => {
  const timestamp = Date.now();
  const chatMessage = JSON.stringify({
    sender: type,
    text: query,
    id: timestamp,
  });

  // Add the user message to the sorted set
  try {
    await redisClient.zAdd(`chat-history:${sessionId}`, {
      score: timestamp,
      value: chatMessage,
    });
  } catch (err) {
    console.error("Error storing message in Redis:", err);
  }
};

// Function to get redis message
const getRedisMessages = async (
  sessionId: string,
  limit: number,
  rev: boolean
) => {
  return await redisClient.zRange(`chat-history:${sessionId}`, 0, limit, {
    REV: rev,
  });
};

export default { storeRedisMessage, getRedisMessages };
