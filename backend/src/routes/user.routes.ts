import { Router } from "express";
import { createUserController, deleteUserController, getAlluserController, updateUserController } from "../controllers/user.controller";
import { createUserValidator, updateUserValidator } from "../validators/user.validator";
import { handleValidationErrors } from "../middlewares/handle_validation_errors";

const userRoute = Router()

userRoute.get("/", getAlluserController)
userRoute.put("/:id", updateUserValidator, handleValidationErrors, updateUserController)
userRoute.delete("/:id", deleteUserController)
userRoute.post("/", createUserValidator, handleValidationErrors, createUserController)

export default userRoute