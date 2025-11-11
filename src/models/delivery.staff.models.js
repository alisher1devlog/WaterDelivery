import mongoose, { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

const deliveryStaffSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Yetkazib beruvchining ismi kiritilishi shart"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Telefon raqam kiritilishi shart"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Parol kiritilishi shart"],
      minlength: [6, "Parol kamida 6 ta belgidan iborat bo'lishi kerak"],
      select: false,
    },
    vehicle_number: {
      type: String,
      required: true,
      trim: true,
    },
    district_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "district",
      required: true,
    },
    role: {
      type: String,
      default: "delivery_staff",
      enum: ["delivery_staff"],
    },
  },
  { timestamps: true }
);

deliveryStaffSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

deliveryStaffSchema.methods.checkPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const deliveryModel = model("delivery", deliveryStaffSchema);

export default deliveryModel;
