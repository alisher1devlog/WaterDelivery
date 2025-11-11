import { Router } from "express";
import addressController from "../controller/address.controller.js";
import { authGuard } from "../middleware/auth.middleware.js";

const router = Router();

router
  .route("/")
  .get(authGuard, addressController.getAllMyAddresses)
  .post(authGuard, addressController.createAddress);

router
  .route("/:id")
  .get(authGuard, addressController.updateAddress)
  .delete(authGuard, addressController.deleteAddress);

export { router as addressRouter };
