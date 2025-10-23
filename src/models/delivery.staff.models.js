import mongoose, { model, Schema } from "mongoose";

const deliverySchema = new Schema({
    name: String,
    phone: String,
    vehicle_number: String,
    district_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "district"
    }
}, { timestamps: true })

const deliveryModel = model("delivery", deliverySchema)

export default deliveryModel;
