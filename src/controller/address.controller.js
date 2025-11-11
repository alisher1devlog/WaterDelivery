import apiError from "../middleware/api.error.js";
import addressModel from "../models/address.models.js";
import districtModel from "../models/district.models.js";
const addressController = {
  getAllMyAddresses: async (req, res, next) => {
    try {
      const address = await addressModel.findById({
        customerId: req.customer._id,
      });
      res.status(200).json({
        success: true,
        data: address,
      });
    } catch (e) {
      next(e);
    }
  },
  createAddress: async (req, res, next) => {
    try {
      const { name, districtId, address, location } = req.body;

      const district = await districtModel.findById(districtId);
      if (!district) {
        return next(new apiError(400, "Bunday tuman mavjud emas"));
      }

      const newAddress = await addressModel.create({
        name,
        districtId,
        address,
        location,
        customerId: req.customer_id,
      });

      res.status(201).json({
        success: true,
        data: newAddress,
      });
    } catch (e) {
      next(e);
    }
  },
  updateAddress: async (req, res, next) => {
    try {
      const { id } = req.params;
      const customerId = req.customer._id;

      const address = await addressModel.findById(id);
      if (!address) {
        return next(new apiError(404, `Manzil topilmadi!`));
      }
      if (address.customer_id.toString() !== customerId.toString()) {
        return next(new apiError(403, `Bu sizning manzilingiz emas!`));
      }

      const updateAddress = await addressModel.findOneAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      res.status(200).json({
        success: true,
        data: updateAddress,
      });
    } catch (e) {
      next(e);
    }
  },
  deleteAddress: async (req, res, next) => {
    try {
      const { id } = req.params;
      const customerId = req.customer._id;

      const address = await addressModel.findById(id);

      if (!address) {
        return next(new apiError(404, `Manzil topilmadi!`));
      }

      if (address.customer_id.toString() !== customerId.toString()) {
        return next(new apiError(403, `Bu sizning manzilingiz emas!`));
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

export default addressController;
