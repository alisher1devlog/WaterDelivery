import mongoose, { model, Schema } from "mongoose"

const addressSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customer",
        required: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    location: {
        type: String,
        trim: true,
    },
    district_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "district",
    },
}, { timestamps: true });


const addressModel = model("address", addressSchema);


export default addressModel;