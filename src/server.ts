import app from "./app";
import CONFIGS from "./config/envConfigs";

app.listen(CONFIGS.PORT, async () => {
  console.log(`Server running at http://localhost:${CONFIGS.PORT}`);
});

// cron.schedule("* * * * *", async () => {
//   await fetchAndSaveRSS();
// });
