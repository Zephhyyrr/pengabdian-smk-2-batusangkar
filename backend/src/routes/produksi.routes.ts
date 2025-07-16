import { Router } from "express";
import {
    getAllProduksiController,
    getProduksiByIdController,
    createProduksiController,
    updateProduksiController,
    deleteProduksiController
} from "../controllers/produksi.controller";

import { produksiValidator } from "../validators/produksi.validator";
import { handleValidationErrors } from "../middlewares/handle_validation_errors";

const produksiRouter = Router();

produksiRouter.get("/", getAllProduksiController);
produksiRouter.get("/:id", getProduksiByIdController);
produksiRouter.post("/", produksiValidator, handleValidationErrors, createProduksiController);
produksiRouter.put("/:id", produksiValidator, handleValidationErrors, updateProduksiController);
produksiRouter.delete("/:id", deleteProduksiController);

export default produksiRouter;
