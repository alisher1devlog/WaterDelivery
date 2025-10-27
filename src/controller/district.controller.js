import districtModel from "../models/district.models.js";


const districtController = {

    get: async (req, res, next) => {
        try {
            const districts = await districtModel.find();
            res.send(districts)
        } catch (e) {
            next(e)
        }
    },
    getOne: async (req, res, next) => {
        try {
            const { id } = req.params;
            const district = await districtModel.findOne({ _id: id });

            res.send(district);
        } catch (e) {
            next(e)
        }
    },
    create: async (req, res, next) => {
        try {
            const district = req.body;
            const newdistrict = await districtModel.create({ district });

            res.send(newdistrict)
        } catch (e) {
            next(e)
        }
    },
    update: async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = req.body;

            const updateDistrict = await districtModel.updateOne({ _id: id }, { data });

            res.send(updateDistrict);
        } catch (e) {
            next(e)
        }
    },
    delete: async (req, res, next) => {
        try {
            const { id } = req.params;
            const deleteDistrict = await districtModel.deleteOne({ _id: id });

            res.send(deleteDistrict);
        } catch (e) {
            next(e)
        }
    }
}

export default districtController;