import deliveryModel from "../models/delivery.staff.models.js";
import apiError from "../middleware/api.error.js";

const deliveryController = {
  get: async (req, res, next) => {
    try {
      const staff = await deliveryModel.find();
      res.status(200).json({
        success: true,
        data: staff,
      });
    } catch (e) {
      next(e);
    }
  },
  getOne: async (req, res, next) => {
    try {
      const { id } = req.params;
      const staffMember = await deliveryModel.findById(id);

      if (!staffMember) {
        return next(
          new apiError(404, `Bu IDga ega yetkazib beruvchi topilmadi`)
        );
      }

      res.status(200).json({
        success: true,
        data: staffMember,
      });
    } catch (e) {
      next(e);
    }
  },
  create: async (req, res, next) => {
    try {
      const { name, phone, password, vehicle_number, district_id } = req.body;

      if (!name || !phone || !password) {
        return next(
          new apiError(
            400,
            `Ism, telefon raqam va password to'ldirilishi majbur!`
          )
        );
      }

      const newStaff = await deliveryModel.create({
        name,
        phone,
        password,
        vehicle_number,
        district_id,
      });

      res.status(201).json({
        success: true,
        data: newStaff,
      });
    } catch (e) {
      next(e);
    }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, phone, vehicle_number, district_id } = req.body;

      const updateStaff = await deliveryModel.findByIdAndUpdate(
        id,
        { name, phone, vehicle_number, district_id },
        { new: true, runValidators: true }
      );

      if (!updateStaff) {
        return next(
          new apiError(404, `Bunday ID li yetkazib beruvchi topilmadi!`)
        );
      }
      res.status(200).json({
        success: true,
        data: updateStaff,
      });
    } catch (e) {
      next(e);
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const deleteStaff = await deliveryModel.findByIdAndDelete(id);

      if (!deleteStaff) {
        return next(
          new apiError(404, `Bu IDga ega yetkazib beruvchi topilmadi`)
        );
      }
      res.status(204).json({
        success: true,
        data: null,
      });
    } catch (e) {
      next(e);
    }
  },
};

export default deliveryController;
