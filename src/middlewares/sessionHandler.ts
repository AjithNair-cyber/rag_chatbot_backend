import session from "express-session";
import { RedisStore } from "connect-redis";
import redisClient from "../setup/redisSetup";
import CONFIGS from "../config/envConfigs";

export const expressRedisSession = session({
  // Use the Redis client to store sessions
  store: new RedisStore({ client: redisClient, prefix: "chatbot-session:" }),
  // Secret is used to sign the session ID cookie. Change this in production.
  secret: CONFIGS.REDIS_SECRET,
  // Forces the session to be saved back to the session store, even if the session was never modified.
  resave: false,
  // Forces a session that is "uninitialized" to be saved to the store.
  saveUninitialized: true,
  // Cookie settings
  cookie: {
    secure: CONFIGS.ENVIRONMENT == "PROD", // Set to true if you are using HTTPS
    httpOnly: true, // Prevents client-side JS from accessing the cookie
    maxAge: 1000 * 60 * 60 * 24, // 24 hours
    sameSite: CONFIGS.ENVIRONMENT == "PROD" ? "none" : "lax",
  },
});
