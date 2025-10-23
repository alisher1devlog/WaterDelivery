import mongoose, { model, Schema } from "mongoose";

const orderItemsSchema = new Schema({
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "orders"
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "waterProduct"
    },
    quantity: Number,
    total_price: Number
}, { timestamps: true })

const orderItemsModel = model("orderItems", orderItemsSchema);

export default orderItemsModel;