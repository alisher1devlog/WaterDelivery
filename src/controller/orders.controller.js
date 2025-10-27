import ordersModel from "../models/orders.models.js";



const orderController = {

    get: async (req, res, next) => {
        try {
            const orders = await ordersModel.find({});

            res.send(orders)
        } catch (e) {
            next(e)
        }
    },
    getOne: async (req, res, next) => {
        try {
            const { id } = req.params;
            const order = await ordersModel.findOne({ _id: id });

            res.send(order)
        } catch (e) {
            next(e)
        }
    },
    create: async (req, res, next) => {
        try {
            const order = req.body;
            const neworder = await ordersModel.create({ order });

            res.send(neworder);
        } catch (e) {
            next(e)
        }
    },
    update: async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = req.body;

            const updateOrder = await ordersModel.updateOne({ _id: id }, { data });

            res.send(updateOrder);
        } catch (e) {
            next(e)
        }
    },
    delete: async (req, res, next) => {
        try {
            const { id } = req.params;
            const deleteOrder = await ordersModel.deleteOne({ _id: id });

            res.send(deleteOrder);
        } catch (e) {
            next(e)
        }
    }
}

export default orderController;