import { Router } from "express"
import addressController from "../controller/address.controller.js";

const router = Router();

router.get("/",addressController.getAllAddress);
router.get("/:id",addressController.getOneAddress);
router.post("/",addressController.createAddress);
router.patch("/:id",addressController.updateAddress);
router.delete("/:id",addressController.deleteAdsress);


