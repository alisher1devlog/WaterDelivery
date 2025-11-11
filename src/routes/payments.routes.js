import { Router } from "express";
import paymentsController from "../controller/payments.controller.js";
import { authGuard } from "../middleware/auth.middleware.js";

const router = Router();

router.get(
  "/order/:orderId",
  authGuard,
  paymentsController.getPaymentForMyOrder
);

router.patch("/:paymentId/status", paymentsController.updatePaymentStatus);

export { router as paymentsRouter };
