import { Router } from "express";
import customerController from "../controller/customer.controller.js";

//Login
export const loginRouter = Router();
loginRouter.post("/", customerController.create);
//Register
export const registerRouter = Router();
registerRouter.post("/",customerController)
