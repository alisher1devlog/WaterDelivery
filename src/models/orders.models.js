import mongoose, { model, Schema } from "mongoose";

const ordersSchema = new Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customer"
    },
    delivery_staff_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "delivery"
    },
    order_date: Date,
    status: {
        type: String,
        enum: [""]
    }
}, { timestamps: true })

const ordersModel = model("orders", ordersSchema);

export default ordersModel;