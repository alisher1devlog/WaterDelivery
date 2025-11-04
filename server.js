import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './src/app.js'; 

dotenv.config();

const PORT = process.env.PORT || 4000;
const DB_URL = process.env.DB_URL;

async function bootstrap() {
  if (!DB_URL) {
    console.error('Xatolik: DB_URL .env faylda ko\'rsatilmagan.');
    process.exit(1);
  }

  try {
    await mongoose.connect(DB_URL);
    console.log(`Ma'lumotlar bazasiga muvaffaqiyatli ulanildi.`);

    app.listen(PORT, () => {
      console.log(`Server http://localhost:${PORT} manzilida ishga tushdi.`);
    });
  } catch (e) {
    console.log(`Serverni ishga tushirishda xatolik:`, e);
    process.exit(1);
  }
}

bootstrap();