import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import {
  districtRouter,
  addressRouter,
  customerRouter,
  deliveryRouter,
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
app.use("/customer", customerRouter);
app.use("/districts", districtRouter);
app.use("/address", addressRouter);
app.use("/water-product", waterProductRouter);
app.use("/delivery-staff", deliveryRouter);
app.use("/orders", orderRouter);
app.use("/payments", paymentsRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "WaterDelivery API ishlamoqda!" });
});

app.use(globalErrorHandler);
export default app;
