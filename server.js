import mongoose from "mongoose";
import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import { districtRouter, addressRouter, customerRouter, deliveryRouter, orderItemsRouter, orderRouter, paymentsRouter, waterProductRouter } from "./src/routes/index.js";


dotenv.config()
const PORT = process.env.PORT || 4000
const app = express();
app.use(express.json());
app.use(morgan("tiny"))


app.use("/address", addressRouter)
app.use("/customer", customerRouter)
app.use("/district", districtRouter)
app.use("/delivery", deliveryRouter)
app.use("/orderItems", orderItemsRouter)
app.use("/order", orderRouter)
app.use("/payments", paymentsRouter)
app.use("waterProduct", waterProductRouter)


async function bootstrap() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log(`Database connect successfully`);
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    } catch (e) {
        console.log(`Serverni ishga tushuruishda xatlolik`, e);
        process.exit(1);
    }
}

bootstrap()



