import waterProductModel from "../models/water.products.models.js";

const waterProductController = {
  get: async (req, res, next) => {
    try {
      const waters = await waterProductModel.find({});

      res.send(waters);
    } catch (e) {
      next(e);
    }
  },
  getOne: async (req, res, next) => {
    try {
      const { id } = req.params;
      const water = await waterProductModel.findOne({ _id: id });

      res.send(water);
    } catch (e) {
      next(e);
    }
  },
  create: async (req, res, next) => {
    try {
      const water = req.body;
      const newWater = await waterProductModel.create({ water });

      res.send(newWater);
    } catch (e) {
      next(e);
    }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;

      const updateWater = await waterProductModel.updateOne(
        { _id: id },
        { data }
      );

      res.send(updateWater);
    } catch (e) {
      next(e);
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const deleteWaterProduct = await waterProductModel.deleteOne({ _id: id });

      res.send(deleteWaterProduct);
    } catch (e) {
      next(e);
    }
  },
};

export default waterProductController;
