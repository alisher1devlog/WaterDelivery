import { Router } from "express";
import districtController from "../controller/district.controller.js";

const router = Router();

router.route("/").get(districtController.get).post(districtController.create);

router
  .route("/:id")
  .get(districtController.getOne)
  .patch(districtController.update)
  .delete(districtController.delete);

export { router as districtRouter };
