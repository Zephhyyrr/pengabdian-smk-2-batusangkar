import { Router } from "express";
import { createJenisController, deleteJenisController, getAllJenisController, updateJenisController } from "../controllers/jenis.controller";
import { jenisValidator } from "../validators/jenis.validator";
import { handleValidationErrors } from "../middlewares/handle_validation_errors";

const jenisRouter = Router()

jenisRouter.get("/", getAllJenisController)
jenisRouter.post("/", jenisValidator, handleValidationErrors, createJenisController)
jenisRouter.put("/:id", jenisValidator, handleValidationErrors, updateJenisController)
jenisRouter.delete("/:id", deleteJenisController)

export default jenisRouter