import app from "./app";
import CONFIGS from "./config/envConfigs";
import cron from "node-cron";
import { fetchAndSaveRSS } from "./functions/scrapingFunctions";

app.listen(CONFIGS.PORT, () => {
  console.log(`Server running at http://localhost:${CONFIGS.PORT}`);
});

// cron.schedule('0 0,12 * * *', async () => {
//   await fetchAndSaveRSS();
// });
