import { Router } from "express";
import orderItemsController from "../controller/order.items.controller.js";

const router = Router();

router.get("/", orderItemsController.get);
router.get("/:id", orderItemsController.getOne);
router.post("/", orderItemsController.create);
router.patch("/:id", orderItemsController.update);
router.delete("/:id", orderItemsController.delete);

export { router as orderItemsRouter };
