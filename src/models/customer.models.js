import { model, Schema } from "mongoose";

const customerSchema = new Schema(
    {
        name: {
            type: String,
            required: true, 
            trim: true,     
        },
        phone: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true });

const customerModel = model("customer", customerSchema)

export default customerModel;