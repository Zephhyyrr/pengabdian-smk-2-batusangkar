import { Router } from "express";
import { createPenjualanController, getAllPenjualanController } from "../controllers/penjualan.controller";
import { penjualanValidator } from "../validators/penjualan.validator";
import { handleValidationErrors } from "../middlewares/handle_validation_errors";

const penjualanRouter = Router()

penjualanRouter.get("/", getAllPenjualanController)
penjualanRouter.post("/", penjualanValidator, handleValidationErrors, createPenjualanController)

export default penjualanRouter