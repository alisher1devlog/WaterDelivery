import { Router } from "express";
import customerController from "../controller/customer.controller.js";

const router = Router();

router.route("/")
    .get(customerController.get)

router.route("/:id")
    .get(customerController.getOne)
    .patch("/:id", customerController.update)
    .delete("/:id", customerController.delete)

export { router as customerRouter };
