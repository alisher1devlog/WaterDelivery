import mongoose, { model, Schema } from "mongoose";


const paymentsSchema = new Schema({
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "orders"
    },
    amount: Number,
    payment_date: Date,
    method: {
        type: String,
        enum: ['cash', 'credit_card', 'debit_card', 'paypal', 'click', 'payme'],
        default: 'cash',
        required: true,
    }
}, { timestamps: true })

const paymentsModel = model("payment", paymentsSchema)


export default paymentsModel;