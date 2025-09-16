import app from "./app";
import CONFIGS from "./config/envConfigs";
import cron from "node-cron";

// Start the server
app.listen(CONFIGS.PORT, async () => {
  console.log(`Server running at http://localhost:${CONFIGS.PORT}`);
});

// Runs at 12:00 AM and 12:00 PM every day
cron.schedule("0 0,12 * * *", () => {
  // Your task code here
  console.log("Task runs at midnight and noon daily");
});
