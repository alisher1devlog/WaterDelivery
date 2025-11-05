import { model, Schema } from "mongoose";

const districtSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const districtModel = model("district", districtSchema);

export default districtModel;
