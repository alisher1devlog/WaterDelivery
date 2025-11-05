import paymentsModel from "../models/payments.models.js";

const paymentsController = {
  get: async (req, res, next) => {
    try {
      const payments = await paymentsModel.find({});

      res.send(payments);
    } catch (e) {
      next(e);
    }
  },
  getOne: async (req, res, next) => {
    try {
      const { id } = req.params;
      const payment = await paymentsModel.findOne({ _id: id });

      res.send(payment);
    } catch (e) {
      next(e);
    }
  },
  create: async (req, res, next) => {
    try {
      const payment = req.body;
      const newPayment = await paymentsModel.create({ payment });

      res.send(newPayment);
    } catch (e) {
      next(e);
    }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;

      const updatePayment = await paymentsModel.updateOne(
        { _id: id },
        { data }
      );

      res.send(updatePayment);
    } catch (e) {
      next(e);
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletePayment = await paymentsModel.deleteOne({ _id: id });

      res.send(deletePayment);
    } catch (e) {
      next(e);
    }
  },
};

export default paymentsController;
