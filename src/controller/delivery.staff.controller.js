import deliveryModel from "../models/delivery.staff.models.js";


const deliveryController = {

    getAllDelivery: async (req, res, next) => {
        try {
            const deliveries = await deliveryModel.find();
            res.send(deliveries)

        } catch (e) {
            next(e)
        }
    },
    getOneDelivery: async (req, res, next) => {
        try {
            const { id } = req.params;
            const delivery = await deliveryModel.findOne({ _id: id });

            res.send(delivery);

        } catch (e) {
            next(e)
        }
    },
    createDelivery: async (req, res, next) => {
        try {
            const delivery = req.body;
            const newdelivery = await deliveryModel.create({ delivery });

            res.send(newdelivery)

        } catch (e) {
            next(e)
        }
    },
    updateDelivery: async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = req.body;

            const updateDelivery = await deliveryModel.updateOne({ _id: id }, { data });

            res.send(updateDelivery);

        } catch (e) {
            next(e)
        }
    },
    deleteDelivery: async (req, res, next) => {
        try {
            const { id } = req.params;
            const deleteDelivery = await deliveryModel.deleteOne({ _id: id });

            res.send(deleteDelivery);

        } catch (e) {
            next(e)
        }
    }
}

export default deliveryController;