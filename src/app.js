import express from 'express';
import morgan from 'morgan'; 
import {
  districtRouter,
  addressRouter,
  customerRouter,
  deliveryRouter,
  orderItemsRouter,
  orderRouter,
  paymentsRouter,
  waterProductRouter,
  loginRouter,
  registerRouter,
} from './routes/index.js'; 

const app = express();

app.use(express.json());
app.use(morgan('tiny'));

app.use("/register",registerRouter);
app.use("/login",loginRouter);
app.use("/address", addressRouter);
app.use("/customer", customerRouter);
app.use("/district", districtRouter);
app.use('/delivery', deliveryRouter);
app.use('/orderItems', orderItemsRouter);
app.use('/order', orderRouter);
app.use('/payments', paymentsRouter);
app.use('/waterProduct', waterProductRouter);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'WaterDelivery API ishlamoqda!' });
});

export default app;