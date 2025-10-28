import mongoose, { model, Schema } from "mongoose";

const deliverySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    vehicle_number: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    district_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "district",
      required: true,
    },
  },
  { timestamps: true },
);

const deliveryModel = model("delivery", deliverySchema);

export default deliveryModel;
