import { Router } from "express";
import orderController from "../controller/orders.controller.js";
import { authGuard } from "../middleware/auth.middleware.js";

const router = Router();

router
  .route("/")
  .get(authGuard, orderController.getMyOrders)
  .post(authGuard, orderController.createOrder);

router.route("/:id").get(authGuard, orderController.getMyOrderById);

router.patch("/cancel/:id", authGuard, orderController.cancelMyOrder);

export { router as orderRouter };
