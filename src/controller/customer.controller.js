import apiError from "../middleware/api.error.js";
import customerModel from "../models/customer.models.js";

const customerController = {
  get: async (req, res, next) => {
    try {
      const customers = await customerModel.find({});
      res.status(200).json({ success: true, data: customers });
    } catch (e) {
      next(e);
    }
  },
  getOne: async (req, res, next) => {
    try {
      const customer = await customerModel.findById(req.params.id);
      if (!customer) {
        return res
          .status(404)
          .json({ success: false, message: `Mijoz topilmadi` });
      }
      res.status(200).json({ success: true, data: customer });
    } catch (e) {
      next(e);
    }
  },
  create: async (req, res, next) => {
    try {
      const newCustomer = await customerModel.create(req.body);
      res.status(201).json({ success: true, data: newCustomer });
    } catch (e) {
      next(e);
    }
  },
  update: async (req, res, next) => {
    try {
      const updatedCustomer = await customerModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

      if (!updatedCustomer) {
        return res
          .status(404)
          .json({ success: false, message: `Mijoz topilmadi` });
      }

      res.status(200).json({ success: true, data: updatedCustomer });
    } catch (e) {
      next(e);
    }
  },
  delete: async (req, res, next) => {
    try {
      const deletedCustomer = await customerModel.findByIdAndDelete(
        req.params.id
      );

      if (!deletedCustomer) {
        return res
          .status(404)
          .json({ success: false, message: `Mijoz topilmadi` });
      }

      res.status(200).json({
        success: true,
        message: `Mijoz muvaffaqiyatli ochirildi`,
        data: deletedCustomer,
      });
    } catch (e) {
      next(e);
    }
  },
  getProfile: async (req, res) => {
    res.status(200).json({
      success: true,
      data: req.customer,
    });
  },
  updateProfile: async (req, res, next) => {
    try {
      const { firstName, lastName, phone } = req.body;
      const customerId = req.customer._id;

      const updatedCustomer = await customerModel
        .findByIdAndUpdate(
          customerId,
          { firstName, lastName, phone },
          { new: true, runValidators: true }
        )
        .select("-password");

      if (!updatedCustomer) {
        return next(new apiError(404, `Foydalanuvchi topilmadi`));
      }

      res.status(200).json({
        success: true,
        data: updatedCustomer,
      });
    } catch (e) {
      next(e);
    }
  },
  deleteProfile: async (req, res, next) => {
    try {
      await customerModel.findByIdAndDelete(req.customer._id);

      res.cookie("refreshToken", "", {
        httpOnly: true,
        expires: new Date(0),
      });

      res.status(204).json({ success: true, data: null });
    } catch (e) {
      next(e);
    }
  },
};

export default customerController;
