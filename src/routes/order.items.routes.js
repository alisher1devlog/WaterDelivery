import { Router } from "express";
import orderItemsController from "../controller/order.items.controller.js";

const router = Router();

router.get("/", orderItemsController.getAllOrderItems);
router.get("/:id", orderItemsController.getOneOrderItems);
router.post("/", orderItemsController.createOrderItems);
router.patch("/:id", orderItemsController.updateOrderItems);
router.delete("/:id", orderItemsController.deleteOrderItems);

export { router as orderItemsRouter }