import mongoose, { model, Schema } from "mongoose";

const ordersSchema = new Schema(
  {
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer",
      required: true,
    },
    delivery_staff_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "delivery",
      required: true,
    },
    order_date: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true },
);

const ordersModel = model("orders", ordersSchema);

export default ordersModel;
