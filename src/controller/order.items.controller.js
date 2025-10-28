import orderItemsModel from "../models/order.items.models.js";

const orderItemsController = {
  get: async (req, res, next) => {
    try {
      const orderItems = await orderItemsModel.find({});

      res.send(orderItems);
    } catch (e) {
      next(e);
    }
  },
  getOne: async (req, res, next) => {
    try {
      const { id } = req.params;
      const orderItem = await orderItemsModel.findOne({ _id: id });

      res.send(orderItem);
    } catch (e) {
      next(e);
    }
  },
  create: async (req, res, next) => {
    try {
      const orderItem = req.body;
      const neworderItem = await orderItemsModel.create({ orderItem });

      res.send(neworderItem);
    } catch (e) {
      next(e);
    }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;

      const updateOrderItem = await orderItemsModel.updateOne(
        { _id: id },
        { data },
      );

      res.send(updateOrderItem);
    } catch (e) {
      next(e);
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const deleteOrderItems = await orderItemsModel.deleteOne({ _id: id });

      res.send(deleteOrderItems);
    } catch (e) {
      next(e);
    }
  },
};

export default orderItemsController;
