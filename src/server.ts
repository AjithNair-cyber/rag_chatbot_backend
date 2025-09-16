import app from "./app";
import CONFIGS from "./config/envConfigs";
import cron from "node-cron";
import scrappingService from "./service/scrappingService";

// Start the server
app.listen(CONFIGS.PORT, async () => {
  await scrappingService.fetchAndSaveRSS();
  console.log(`Server running at http://localhost:${CONFIGS.PORT}`);
});

// Runs at 12:00 AM and 12:00 PM every day
cron.schedule("0 0,12 * * *", async () => {
  // Your task code here
  await scrappingService.fetchAndSaveRSS();
  console.log("Task runs at midnight and noon daily");
});
