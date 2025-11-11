import ordersModel from "../models/orders.models.js";
import apiError from "../middleware/api.error.js";
import mongoose from "mongoose";
import addressModel from "../models/address.models.js";
import waterProductModel from "../models/water.products.models.js";
import paymentsModel from "../models/payments.models.js";

const orderController = {
  getMyOrders: async (req, res, next) => {
    try {
      const customerId = req.customer._id;

      const orders = await ordersModel
        .find({ customerId })
        .sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        data: orders,
      });
    } catch (e) {
      next(e);
    }
  },
  getMyOrderById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const customerId = req.customer._id;

      const order = await ordersModel
        .findOne({ _id: id, customerId })
        .populate("addressId")
        .populate("items.productId", "name volume");

      if (!order) {
        return next(
          new apiError(
            404,
            `Buyurtma topilmadi (yoki bu sizning buyurtmangiz emas)`
          )
        );
      }

      res.status(200).json({
        success: true,
        data: order,
      });
    } catch (e) {
      next(e);
    }
  },
  createOrder: async (req, res, next) => {
    const session = await mongoose.startSession();

    session.startTransaction();

    try {
      const { items, addressId, paymentMethod } = req.body;
      const customerId = req.customer._id;

      if (!items || items.length === 0 || !addressId || !paymentMethod) {
        throw new apiError(400, `Iltimos, barcha maydonlarni to'ldiring`);
      }

      const address = await addressModel
        .findOne({ _id: addressId, customer_id: customerId })
        .session(session);
      if (!address) {
        throw new apiError(404, `Bu manzil sizga tegishli emas yoki topilmadi`);
      }

      let totalPrice = 0;
      const orderItemsForDb = [];

      for (const item of items) {
        const product = await waterProductModel
          .findById(item.productId)
          .session(session);
        if (!product) {
          throw new apiError(400, `${item.productId} IDli mahsulot topilmadi`);
        }
        if (!product.isInStock) {
          throw new apiError(400, `${product.name} hozir sotuvda yo'q`);
        }
        totalPrice += product.price * item.quantity;
        orderItemsForDb.push({
          productId: item.productId,
          quantity: item.quantity,
          price: product.price,
        });
      }
      const newOrderArr = await ordersModel.create(
        [
          {
            customerId,
            addressId,
            items: orderItemsForDb,
            totalPrice,
            status: "pending",
          },
        ],
        { session }
      );

      const newOrder = newOrderArr[0];

      await paymentsModel.create(
        [
          {
            order_id: newOrder._id,
            amount: totalPrice,
            method: paymentMethod,
            status: "pending",
          },
        ],
        { session }
      );

      await session.commitTransaction();

      res.status(201).json({
        success: true,
        message: `Buyurtma muvaffaqiyatli yaratildi!`,
        date: newOrder,
      });
    } catch (e) {
      await session.abortTransaction();
      next(e);
    } finally {
      session.endSession();
    }
  },
  cancelMyOrder: async (req, res, next) => {
    try {
      const { id } = req.params;
      const customerId = req.customer._id;

      const order = await ordersModel.deleteOne({
        _id: id,
        customerId,
      });

      if (!order) {
        return next(
          new apiError(
            404,
            `Buyurtma topilmadi (yoki bu sizning buyurtmangiz emas)!`
          )
        );
      }

      if (!order.status !== "pending") {
        return next(
          new apiError(
            400,
            `Buyurtmani bekor qilib bo'lmaydi (holati: ${order.status})`
          )
        );
      }

      order.status = "cancelled";
      await order.save();

      res.status(200).json({
        success: true,
        message: "Buyurtma muvaffaqiyatli bekor qilindi",
        data: order,
      });
    } catch (e) {
      next(e);
    }
  },
};

export default orderController;
