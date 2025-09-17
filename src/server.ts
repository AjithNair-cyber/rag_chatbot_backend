import app from "./app";
import CONFIGS from "./config/envConfigs";
import cron from "node-cron";
import scrappingService from "./service/scrappingService";
import redisClient from "./setup/redisSetup";

// Start the server
app.listen(CONFIGS.PORT, async () => {
  console.log(`Server running at http://localhost:${CONFIGS.PORT}`);
  await redisClient.connect();
});

// Runs at 12:00 AM and 12:00 PM every day
cron.schedule("0 0,12 * * *", async () => {
  // Your task code here
  await scrappingService.fetchAndSaveRSS();
  console.log("Task runs at midnight and noon daily");
});
