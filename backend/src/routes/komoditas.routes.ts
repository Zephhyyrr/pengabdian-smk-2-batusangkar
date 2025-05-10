import { Router } from "express";
import { uploadDrive } from "../middlewares/drive_upload";
import { createKomoditasValidator, updateKomoditasValidator } from "../validators/komoditas.validator";
import { handleValidationErrors } from "../middlewares/handle_validation_errors";
import { createKomoditasController, deleteKomoditasController, getAllKomoditasController, getKomoditasByIdController, updateKomoditasController } from "../controllers/komoditas.controller";

const komoditasRouter = Router()

komoditasRouter.get("/", getAllKomoditasController)
komoditasRouter.get("/:id", getKomoditasByIdController)
komoditasRouter.delete("/:id", deleteKomoditasController)
komoditasRouter.post("/", uploadDrive.single("foto"), createKomoditasValidator, handleValidationErrors, createKomoditasController)
komoditasRouter.put("/:id", uploadDrive.single("foto"), updateKomoditasValidator, handleValidationErrors, updateKomoditasController)

export default komoditasRouter