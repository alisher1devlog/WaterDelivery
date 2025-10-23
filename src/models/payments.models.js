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
            required: true,
            min: [0, "Qiymat minusdan bo'lmasligi kerak"],
        },
        payment_date: {
            type: Date,
            default: Date.now,
        },
        method: {
            type: String,
            enum: ["cash", "credit_card", "debit_card", "paypal", "click", "payme"],
            default: "cash",
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "completed", "failed"],
            default: "completed",
        },
    },
    { timestamps: true }
);

const paymentsModel = model("payment", paymentsSchema)


export default paymentsModel;