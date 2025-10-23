import { model, Schema } from "mongoose";


const waterProductSchema = new Schema({
    name: String,
    volume_liters: Number,
    price: Number
}, { timestamps: true })

const waterProductModel = model("waterProduct", waterProductSchema);

export default waterProductModel;