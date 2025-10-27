import customerModel from "../models/customer.models.js"


const customerController = {

    get: async (req, res, next) => {
        try {
            const customers = await customerModel.find({});
            res.send(customers)

        } catch (e) {
            next(e)
        }
    },
    getOne: async (req, res, next) => {
        try {
            const { id } = req.params;
            const customer = await customerModel.findOne({ _id: id });
            res.send(customer)

        } catch (e) {
            next(e)
        }
    },
    create: async (req, res, next) => {
        try {
            const customer = req.body;
            const newCustomer = await customerModel.create(customer);
            res.send(newCustomer)

        } catch (e) {
            next(e)
        }
    },
    update: async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = req.body;

            const updateCustomer = await customerModel.updateOne({ _id: id }, { data });

            res.send(updateCustomer);
        } catch (e) {
            next(e)
        }
    },
    delete: async (req, res, next) => {
        try {
            const { id } = req.params;
            const deleteCustomer = await customerModel.deleteOne({ _id: id });

            res.send(deleteCustomer)
        } catch (e) {
            next(e)
        }
    }
}

export default customerController;