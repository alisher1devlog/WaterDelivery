import { Router } from "express";
import paymentsController from "../controller/payments.controller.js";

const router = Router();

router.get("/", paymentsController.get);
router.get("/:id", paymentsController.getOne);
router.post("/", paymentsController.create);
router.patch("/:id", paymentsController.update);
router.delete("/:id", paymentsController.delete);

export { router as paymentsRouter };
