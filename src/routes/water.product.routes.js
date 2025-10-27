import { Router } from "express";
import waterProductController from "../controller/water.products.controller.js";

const router = Router();

router.get("/", waterProductController.get);
router.get("/:id", waterProductController.getOne);
router.post("/", waterProductController.create);
router.patch("/:id", waterProductController.update);
router.delete("/:id", waterProductController.delete);

export { router as waterProductRouter }