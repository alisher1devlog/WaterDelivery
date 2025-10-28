import { Router } from "express";
import deliveryController from "../controller/customer.controller.js";

const router = Router();

router.get("/", deliveryController.get);
router.get("/:id", deliveryController.getOne);
router.post("/", deliveryController.create);
router.patch("/:id", deliveryController.update);
router.delete("/:id", deliveryController.delete);

export { router as deliveryRouter };
