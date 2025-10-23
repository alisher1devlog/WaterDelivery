import { Router } from "express";
import customerController from "../controller/customer.controller.js";


const router = Router();

router.get("/", customerController.getAllCustomer);
router.get("/:id", customerController.getOneCustomer);
router.post("/", customerController.createCustomer);
router.patch("/:id", customerController.updateCustomer);
router.delete("/:id", customerController.deleteCustomer);

export { router as customerRouter }