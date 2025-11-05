import jwt from "jsonwebtoken";
import apiError from "./api.error.js";
import customerModel from "../models/customer.models.js";

export const authGuard = async (req, res, next) => {
  let token;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(new apiError(401, "Ruxsat yo'q. Iltimos, tizimga kiring."));
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    const customer = await customerModel
      .findById(decoded.id)
      .select("-password");

    if (!customer) {
      return next(
        new apiError(401, "Bu kalitga tegishli foydalanuvchi topilmadi")
      );
    }

    req.customer = customer;

    next();
  } catch  {
    return next(
      new apiError(401, "Ruxsat yo'q. Token yaroqsiz yoki muddati o'tgan.")
    );
  }
};
