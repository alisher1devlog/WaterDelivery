import { Router } from "express";
import deliveryController from "../controller/customer.controller.js";

const router = Router();

router.route("/").get(deliveryController.get).post(deliveryController.create);

router
  .route("/:id")
  .get(deliveryController.getOne)
  .patch(deliveryController.update)
  .delete(deliveryController.delete);

export { router as deliveryRouter };
