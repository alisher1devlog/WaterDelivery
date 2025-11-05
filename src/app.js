import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import {
  districtRouter,
  addressRouter,
  customerRouter,
  deliveryRouter,
  orderItemsRouter,
  orderRouter,
  paymentsRouter,
  waterProductRouter,
  authRouter,
} from "./routes/index.js";
import globalErrorHandler from "./middleware/error.handler.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("tiny"));

app.use("/auth", authRouter);
app.use("/address", addressRouter);
app.use("/customer", customerRouter);
app.use("/district", districtRouter);
app.use("/delivery", deliveryRouter);
app.use("/orderItems", orderItemsRouter);
app.use("/order", orderRouter);
app.use("/payments", paymentsRouter);
app.use("/waterProduct", waterProductRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "WaterDelivery API ishlamoqda!" });
});

app.use(globalErrorHandler);
export default app;
