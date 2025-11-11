import { Schema, model } from "mongoose";

const orderItemSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "waterProduct",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Soni kamida 1 bo'lishi kerak"],
      default: 1,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const orderSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "customer",
      required: true,
    },
    deliveryStaffId: {
      type: Schema.Types.ObjectId,
      ref: "delivery",
      required: false,
    },
    addressId: {
      type: Schema.Types.ObjectId,
      ref: "address",
      required: true,
    },

    items: [orderItemSchema],

    status: {
      type: String,
      required: true,
      default: "pending",
      enum: ["pending", "processing", "on_delivery", "completed", "cancelled"],
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const ordersModel = model("orders", orderSchema);

export default ordersModel;
