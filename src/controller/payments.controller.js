import apiError from "../middleware/api.error.js";
import ordersModel from "../models/orders.models.js";
import paymentsModel from "../models/payments.models.js";
const paymentController = {
  getPaymentForMyOrder: async (req, res, next) => {
    try {
      const { orderId } = req.params;
      const customerId = req.customer._id;

      const order = await ordersModel.findOne({
        _id: orderId,
        customerId,
      });

      if (!order) {
        return next(
          new apiError(
            404,
            "Buyurtma topilmadi (yoki bu sizning buyurtmangiz emas)"
          )
        );
      }

      const payment = await paymentsModel.findOne({ order_id: order._id });

      if (!payment) {
        return next(new apiError(404, "Bu buyurtma uchun to'lov topilmadi"));
      }

      res.status(200).json({
        success: true,
        data: payment,
      });
    } catch (e) {
      next(e);
    }
  },

  updatePaymentStatus: async (req, res, next) => {
    try {
      const { paymentId } = req.params;
      const { status } = req.body;

      if (!status) {
        return next(new apiError(400, "Yangi status kiritilishi shart"));
      }

      const updatedPayment = await paymentsModel.findByIdAndUpdate(
        paymentId,
        { status: status },
        { new: true, runValidators: true }
      );

      if (!updatedPayment) {
        return next(new apiError(404, "Bu IDga ega to'lov topilmadi"));
      }
      if (updatedPayment.status === "completed") {
        await ordersModel.findByIdAndUpdate(updatedPayment.order_id, {
          status: "processing",
        });
      }

      res.status(200).json({
        success: true,
        message: "To'lov holati muvaffaqiyatli yangilandi",
        data: updatedPayment,
      });
    } catch (e) {
      next(e);
    }
  },
};

export default paymentController;
