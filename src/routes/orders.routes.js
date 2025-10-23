import { Router } from "express";
import orderController from "../controller/orders.controller.js";

const router = Router();

router.get("/", orderController.getAllOrder);
router.get("/:id", orderController.getOneOrder);
router.post("/", orderController.createOrder);
router.patch("/:id", orderController.updateOrder);
router.delete("/:id", orderController.deleteOrder);

export { router as orderRouter }