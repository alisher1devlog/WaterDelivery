import { Router } from "express";
import deliveryController from "../controller/customer.controller.js";


const router = Router();

router.get("/", deliveryController.getAllCustomer);
router.get("/:id", deliveryController.getOneCustomer);
router.post("/", deliveryController.createCustomer);
router.patch("/:id", deliveryController.updateCustomer);
router.delete("/:id", deliveryController.deleteCustomer);

export { router as deliveryRouter }