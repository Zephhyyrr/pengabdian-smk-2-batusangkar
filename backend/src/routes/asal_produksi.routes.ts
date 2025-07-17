import { Router } from "express";
import {
    getAllAsalProduksiController,
    getByIdAsalProduksiController,
    createAsalProduksiController,
    updateAsalProduksiController,
    deleteAsalProduksiController
} from "../controllers/asal_produksi.controller";
import { asalProduksiValidator } from "../validators/asal_produksi.validator";
import { handleValidationErrors } from "../middlewares/handle_validation_errors";

const asalProduksiRouter = Router();

asalProduksiRouter.get("/", getAllAsalProduksiController);
asalProduksiRouter.get("/:id", getByIdAsalProduksiController);
asalProduksiRouter.post("/", asalProduksiValidator, handleValidationErrors, createAsalProduksiController);
asalProduksiRouter.put("/:id", asalProduksiValidator, handleValidationErrors, updateAsalProduksiController);
asalProduksiRouter.delete("/:id", deleteAsalProduksiController);

export default asalProduksiRouter;
