import mongoose, { model, Schema } from "mongoose";

const orderItemsSchema = new Schema(
    {
        order_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "orders",
            required: true,
        },
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "waterProduct",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: [1, "Miqdor kamida 1 ta bo'lishi kerak"],
        },
        total_price: {
            type: Number,
            required: true,
            min: [0, "Narx minusdan bo'lmasligi kerak"],
        },
    },
    { timestamps: true }
);

const orderItemsModel = model("orderItems", orderItemsSchema);

export default orderItemsModel;