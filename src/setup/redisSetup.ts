import { createClient } from "redis";
import CONFIGS from "../config/envConfigs";

const redisClient = createClient({
  username: CONFIGS.REDIS_DATABASE_USERNAME,
  password: CONFIGS.REDIS_DATABASE_PASSWORD,
  socket: {
    host: CONFIGS.REDIS_ENDPOINT,
    port: 16854,
  },
});
redisClient.on("error", (err) => console.log("Redis Client Error", err));

export default redisClient;
