import mongoose from "mongoose";
import  express  from "express"
import dotenv from "dotenv"
import morgan from "morgan"

dotenv.config()
const PORT = process.env.PORT || 4000
const app = express();
app.use(morgan("tiny"))





async function bootstrap() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log(`Database connect successfully`);
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    } catch (e) {
        console.log(`Serverni ishga tushuruishda xatlolik`,e);
        process.exit(1);
    }
}

bootstrap()



