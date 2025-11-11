import { Router } from "express";
import authController from "../controller/auth.controller.js";
import { validate } from "../middleware/validation.middleware.js";
import { signInSchema, signUpSchema } from "../validation/auth.validation.js";
import { authGuard } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/signup", validate(signUpSchema), authController.signup);
router.post("/signin", validate(signInSchema), authController.signin);
router.get("/profile", authGuard, authController.profile);
router.post("/update-access", authController.updateAccess);

export { router as authRouter };
