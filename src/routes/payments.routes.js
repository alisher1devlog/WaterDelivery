import { Router } from "express";
import paymentsController from "../controller/payments.controller.js";

const router = Router();

router.get("/", paymentsController.getAllPayments);
router.get("/:id", paymentsController.getOnePayments);
router.post("/", paymentsController.createPayments);
router.patch("/:id", paymentsController.updatePayments);
router.delete("/:id", paymentsController.deletePayments);

export { router as paymentsRouter }