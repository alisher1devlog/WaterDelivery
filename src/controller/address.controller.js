import addressModel from "../models/address.models.js"

const addressController = {

    getAllAddress: async (req, res, next) => {
        try {
            const address = await addressModel.find({});

            res.send(address)
        } catch (e) {
            next(e)
        }
    },
    getOneAddress: async (req, res, next) => {
        try {
            const { id } = req.params;
            const address = await addressModel.findById({ _id: id })
            res.send(address)
        } catch (e) {
            next(e)
        }
    },
    createAddress: async (req, res, next) => {
        try {
            const address = req.body;
            const newAddress = await addressModel.create({ address })
            res.send(newAddress)
        } catch (e) {
            next(e)
        }
    },
    updateAddress: async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = req.body;
            const updateAddress = await addressModel.updateOne({ _id: id }, { data })

            res.send(updateAddress)
        } catch (e) {
            next(e)
        }
    },
    deleteAddress: async (req, res, next) => {
        try {
            const { id } = req.params;
            const deleteAddress = await addressModel.deleteOne({ _id: id });

            res.send(deleteAddress);

        } catch (e) {
            next(e)
        }
    }
}

export default addressController;