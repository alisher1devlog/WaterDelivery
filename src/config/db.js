import mongoose from "mongoose";
import config from "./index.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.dbUrl);

    console.log(`MongoDBga muvaffaqiyatli ulanildi: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDBga ulanishda xatolik: ${error.message}`);
    process.exit(1);
  }
};
