import { Router } from "express";
import customerController from "../controller/customer.controller.js";


const router = Router();

router.get("/", customerController.get);
router.get("/:id", customerController.getOne);
router.post("/", customerController.create);
router.patch("/:id", customerController.update);
router.delete("/:id", customerController.delete);

export { router as customerRouter }