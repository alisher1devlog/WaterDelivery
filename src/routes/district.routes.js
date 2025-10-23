import { Router } from "express";
import districtController from "../controller/district.controller.js";

const router = Router();

router.get("/", districtController.getAllDistrict);
router.get("/:id", districtController.getOneDistrict);
router.post("/", districtController.createDistrict);
router.patch("/:id", districtController.updateDistrict);
router.delete("/:id", districtController.deleteDistrict);

export { router as districtRouter }