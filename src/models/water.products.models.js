import { model, Schema } from "mongoose";

const waterProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    volume_liters: {
      type: Number,
      required: true,
      min: [0.1, "Suv kamida 0.1 litr bo'lishi kerak"],
    },
    price: {
      type: Number,
      required: [true, `Mahsulot narxi kiritilishi shart`],
      min: [0, "Narx minusdan bo'lmasligi kerak"],
    },
    isInStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const waterProductModel = model("waterProduct", waterProductSchema);

export default waterProductModel;
