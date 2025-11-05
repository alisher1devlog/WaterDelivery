import { Router } from "express";
import customerController from "../controller/customer.controller.js";

const router = Router();

router.route("/").get(customerController.get);

router
  .route("/:id")
  .get(customerController.getOne)
  .patch(customerController.update)
  .delete(customerController.delete);

export { router as customerRouter };
