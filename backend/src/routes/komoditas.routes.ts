import { Router } from "express";
import upload from "../middlewares/upload";
import { createKomoditasValidator, updateKomoditasValidator } from "../validators/komoditas.validator";
import { handleValidationErrors } from "../middlewares/handle_validation_errors";
import { createKomoditasController, deleteKomoditasController, getAllKomoditasController, getKomoditasByIdController, updateKomoditasController } from "../controllers/komoditas.controller";
import { jwtCheckToken } from "../middlewares/jwt_check_token";
import { isRole } from "../middlewares/is_role";

const komoditasRouter = Router()

komoditasRouter.get("/", getAllKomoditasController)
komoditasRouter.get("/:id", getKomoditasByIdController)

komoditasRouter.use(jwtCheckToken, isRole(["admin", "guru"]),)
komoditasRouter.delete("/:id", deleteKomoditasController)
komoditasRouter.post("/", upload.single("foto"), createKomoditasValidator, handleValidationErrors, createKomoditasController)
komoditasRouter.put("/:id", upload.single("foto"), updateKomoditasValidator, handleValidationErrors, updateKomoditasController)

export default komoditasRouter