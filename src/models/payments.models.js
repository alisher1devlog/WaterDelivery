import mongoose, { model, Schema } from "mongoose";

const paymentsSchema = new Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orders",
      required: true,
    },
    amount: {
      type: Number,
      required: [true, "To'lov summasi kiritilishi shart"],
    },
    method: {
      type: String,
      enum: ["cash", "credit_card", "debit_card", "paypal", "click", "payme"],
      default: "cash",
      required: true,
    },
    status: {
      type: String,
      enum: ["processing", "completed", "failed"],
      default: "processing",
    },
  },
  { timestamps: true }
);

const paymentsModel = model("payment", paymentsSchema);

export default paymentsModel;
