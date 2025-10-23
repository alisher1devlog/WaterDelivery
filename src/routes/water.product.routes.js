import { Router } from "express";
import waterProductController from "../controller/water.products.controller.js";

const router = Router();

router.get("/", waterProductController.getAllWater);
router.get("/:id", waterProductController.getOneWater);
router.post("/", waterProductController.createWater);
router.patch("/:id", waterProductController.updateWater);
router.delete("/:id", waterProductController.deleteWater);

export { router as waterProductRouter }