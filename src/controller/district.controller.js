import apiError from "../middleware/api.error.js";
import districtModel from "../models/district.models.js";

const districtController = {
  get: async (req, res, next) => {
    try {
      const districts = await districtModel.find();

      res.status(200).json({
        success: true,
        data: districts,
      });
    } catch (e) {
      next(e);
    }
  },
  getOne: async (req, res, next) => {
    try {
      const { id } = req.params;
      const district = await districtModel.findById(id);
      if (!district) {
        return next(new apiError(404, `Bu ID ga eag tuman topilmadi!`));
      }

      res.status(200).json({
        success: true,
        data: district,
      });
    } catch (e) {
      next(e);
    }
  },
  create: async (req, res, next) => {
    try {
      const name = req.body;
      if (!name) {
        return next(new apiError(400, `Tuman nomi kiritilishi shart!`));
      }

      const newdistrict = await districtModel.create({ name });

      res.status(201).json({
        success: true,
        data: newdistrict,
      });
    } catch (e) {
      next(e);
    }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const name = req.body;

      const updateDistrict = await districtModel.findByIdAndUpdate(
        id,
        { name },
        { new: true, runValidators: true }
      );

      if (!updateDistrict) {
        return next(new apiError(404, `Bu IDga aga tuman topilmadi!`));
      }

      res.status(200).json({
        success: true,
        data: updateDistrict,
      });
    } catch (e) {
      next(e);
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const deleteDistrict = await districtModel.findByIdAndDelete(id);
      if (!deleteDistrict) {
        return next(new apiError(404, `Bunday IDli tuman topilmadi!`));
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

export default districtController;
