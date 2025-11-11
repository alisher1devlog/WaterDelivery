import waterProductModel from "../models/water.products.models.js";
import apiError from "../middleware/api.error.js";

const waterProductController = {
  get: async (req, res, next) => {
    try {
      const products = await waterProductModel.find({ isInStock: true });

      res.status(200).json({
        success: true,
        data: products,
      });
    } catch (e) {
      next(e);
    }
  },
  getOne: async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await waterProductModel.findById(id);

      if (!product) {
        return next(new apiError(404`Bu IDga ega mahsulot topilmadi`));
      }
      res.status(200).json({
        success: true,
        data: product,
      });
    } catch (e) {
      next(e);
    }
  },
  create: async (req, res, next) => {
    try {
      const { name, volume, price } = req.body;
      if (!name || !volume || !price) {
        return next(
          new apiError(400, `Nomi, hajmi va narxi kiritilishi shart`)
        );
      }

      const newProduct = await waterProductModel.create({
        name,
        volume,
        price,
      });

      res.status(201).json({
        success: true,
        data: newProduct,
      });
    } catch (e) {
      next(e);
    }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params;

      const updateProduct = await waterProductModel.findByIdAndUpdate(
        id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!updateProduct) {
        return next(new apiError(404, `Bu IDga ega mahsulot topilmadi`));
      }
      res.status(200).json({
        success: true,
        data: updateProduct,
      });
    } catch (e) {
      next(e);
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const deleteWaterProduct = await waterProductModel.findByIdAndDelete(id);

      if (!deleteWaterProduct) {
        return next(new apiError(404, `Bu IDga ega mahsulot topilmadi`));
      }
      res.status(204).json({
        success: true,
        data: deleteWaterProduct,
      });
    } catch (e) {
      next(e);
    }
  },
};

export default waterProductController;
