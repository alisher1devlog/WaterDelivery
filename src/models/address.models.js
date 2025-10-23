// import mongoose, { model, Schema } from "mongoose"

const addressSchema = new Schema({
    name: String,
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customer"
    },
    address: String,
    location: String,
    district_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "district"
    }
}, { timestamps: true })

const addressModel = model("address", addressSchema);


export default addressModel;