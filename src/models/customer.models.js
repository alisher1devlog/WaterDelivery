import { model, Schema } from "mongoose";

const customerSchema = new Schema({
    name: String,
    phone: String
}, { timestamps: true })

const customerModel = model("customer", customerSchema)

export default customerModel;