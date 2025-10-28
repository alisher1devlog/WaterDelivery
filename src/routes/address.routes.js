import { Router } from "express";
import addressController from "../controller/address.controller.js";

const router = Router();

router.get("/", addressController.get);
router.get("/:id", addressController.getOne);
router.post("/", addressController.create);
router.patch("/:id", addressController.update);
router.delete("/:id", addressController.delete);

export { router as addressRouter };
