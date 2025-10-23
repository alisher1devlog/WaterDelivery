import { model, Schema } from "mongoose";


const waterProductSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        volume_liters: {
            type: Number,
            required: true,
            min: [0.1, "Suv kamida 0.1 litr bo'lishi kerak"],
        },
        price: {
            type: Number,
            required: true,
            min: [0, "Narx minusdan bo'lmasligi kerak"],
        },
    },
    { timestamps: true }
);

const waterProductModel = model("waterProduct", waterProductSchema);

export default waterProductModel;