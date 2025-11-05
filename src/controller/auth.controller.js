import apiError from "../middleware/api.error.js";
import customerModel from "../models/customer.models.js";
import { generateToken } from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

const authController = {
  refresh: async (req, res, next) => {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        return next(new apiError(401, `Ruxsat yo'q!`));
      }
      let decoded;
      try {
        decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      } catch {
        return next(new apiError(401, `Refresh token yaroqli emas!`));
      }

      const customer = await customerModel.findById(decoded.id);
      if (!customer) {
        return next(new apiError(401, `Token egasi topilmadi!`));
      }

      const newAccessToken = generateToken.generateAccessToken(customer._id);

      res.status(200).json({
        success: true,
        accessToken: newAccessToken,
      });
    } catch (e) {
      next(e);
    }
  },
  signup: async (req, res, next) => {
    try {
      const { firstName, phone, email, password } = req.body;

      if (!firstName || !email || !password || !phone) {
        throw new apiError(
          400,
          "Name, phone, email va password maydonlari to'ldirilishi kerak"
        );
      }

      const newCustomer = await customerModel.create({
        firstName,
        phone,
        email,
        password,
      });
      const token = generateToken(newCustomer._id);

      res.status(201).json({
        success: true,
        message: `Mijoz muvafaqiyatli ro'yhatdan o'tdi!`,
        token,
        data: {
          id: newCustomer._id,
          firstName: newCustomer.firstName,
          email: newCustomer.email,
        },
      });
    } catch (e) {
      next(e);
    }
  },
  signin: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(
          new apiError(400, "Email va password maydonlari to'ldirishi kerak!")
        );
      }

      const customer = await customerModel
        .findOne({ email: email })
        .select("+password");

      if (!customer || !(await customer.checkPassword(password))) {
        return next(new apiError(401, "Email yoki parol nato'g'ri!"));
      }

      const accessToken = generateToken.generateAccessToken(customer._id);
      const refreshToken = generateToken.generateRefreshToken(customer._id);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        success: true,
        message: "Tizimga muvaffaqiyatli kirildi",
        accessToken,
        data: {
          id: customer._id,
          name: customer.name,
          email: customer.email,
        },
      });
    } catch (e) {
      next(e);
    }
  },
  profile: async (req, res, next) => {
    try {
      res.status(200).json({
        success: true,
        data: req.customer,
      });
    } catch (e) {
      next(e);
    }
  },
};

export default authController;
