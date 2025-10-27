import { Router } from "express";
import orderController from "../controller/orders.controller.js";

const router = Router();

router.get("/", orderController.get);
router.get("/:id", orderController.getOne);
router.post("/", orderController.create);
router.patch("/:id", orderController.update);
router.delete("/:id", orderController.delete);

export { router as orderRouter }