import schedule from 'node-schedule';
import { AdvertisementModel } from "../database/models/advertisement/model";

export const autoDeleteExpiredAds = async () => {
    const currentDate = new Date();
  
    await AdvertisementModel.updateMany(
      { expirationDate: { $lt: currentDate } },
      { $set: { archived: true } }
    );
  };

// Schedule the autoDeleteExpiredAds to run daily at a specific time (adjust as needed)
schedule.scheduleJob('0 0 * * *', async () => {
  await autoDeleteExpiredAds();
  console.log('Auto-deletion of expired advertisements completed.');
});
 