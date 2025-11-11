import { Router } from "express";
import customerController from "../controller/customer.controller.js";
import { authGuard } from "../middleware/auth.middleware.js";

const router = Router();

router
  .route("/profile")
  .get(authGuard, customerController.getProfile)
  .patch(authGuard, customerController.updateProfile)
  .delete(authGuard, customerController.deleteProfile);

router.route("/").get(customerController.get);

router
  .route("/:id")
  .get(customerController.getOne)
  .patch(customerController.update)
  .delete(customerController.delete);

export { router as customerRouter };
