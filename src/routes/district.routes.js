import { Router } from "express";
import districtController from "../controller/district.controller.js";

const router = Router();

router.get("/", districtController.get);
router.get("/:id", districtController.getOne);
router.post("/", districtController.create);
router.patch("/:id", districtController.update);
router.delete("/:id", districtController.delete);

export { router as districtRouter }