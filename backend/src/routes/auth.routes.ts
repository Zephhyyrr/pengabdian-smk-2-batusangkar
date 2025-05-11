import { Router } from "express";
import { loginController } from "../controllers/auth.controller";
import { loginValidator } from "../validators/auth.validator";
import { handleValidationErrors } from "../middlewares/handle_validation_errors";

const authRouter = Router()

authRouter.post("/login", loginValidator, handleValidationErrors, loginController)

export default authRouter