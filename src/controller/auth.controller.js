import {json} from "express"
import bcrypt from "bcrypt"
import apiError from "../middleware/api.error.js"
import customerModel from "../models/customer.models.js"
import generateToken from "../utils/generateToken.js"


const authController = {
    register: async (req,res,next)=>{
        try {
            const {name,phone,email,password} = req.body;
            
            if (!name || !email || !password) {
                throw new apiError(400,'Name, phone, email va password maydonlari to\'ldirilishi kerak');
            }

            const newCustomer = await customerModel.create({name,phone,email,password});

            res.status(201).json(newCustomer);
        } catch (e) {
            next(e)
        }
    },
    login: async (req,res,next)=>{
        try {
           const {email, password} = req.body;
           if (!email || !password) {
            return next(new apiError(400,'Email va password maydonlari to\'ldirishi kerak!'));
           }

           const customer = await customerModel.findOne(email).select('+password');

           if (!customer || !(await customer.checkPassword(password))) {
            return next(new apiError(401,'Email yoki parol nato\'g\'ri!'));
           }

           const token = generateToken(customer._id);

           res.status(200).json({
            success:true,
            message:'Tizimga muvaffaqiyatli kirildi',
            token,
            data:{
                id:customer._id,
                name:customer.name,
                email:customer.email
            }
           })
        } catch (e) {
               next(e); 
        }
    }


}
