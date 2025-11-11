import { Router } from "express";
import waterProductController from "../controller/water.products.controller.js";

const router = Router();

router
  .route("/")
  .get(waterProductController.get)
  .post(waterProductController.create);

router
  .route("/:id")
  .get(waterProductController.getOne)
  .patch(waterProductController.update)
  .delete(waterProductController.delete);

export { router as waterProductRouter };
