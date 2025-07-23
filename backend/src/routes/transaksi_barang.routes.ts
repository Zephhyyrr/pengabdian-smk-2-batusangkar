import { Router } from "express";
import { transaksiBarangValidator } from "../validators/transaksi_barang.validator";
import { handleValidationErrors } from "../middlewares/handle_validation_errors";  
import {
    getAllTransaksiBarangController,
    getTransaksiBarangByIdController,
    createTransaksiBarangController,
    updateTransaksiBarangController,
    deleteTransaksiBarangController
} from "../controllers/transaksi_barang.controller"; 

const router = Router();

router.get("/", getAllTransaksiBarangController);

router.get("/:id", getTransaksiBarangByIdController);

router.post("/", transaksiBarangValidator, handleValidationErrors, createTransaksiBarangController);

router.put("/:id",transaksiBarangValidator, handleValidationErrors, updateTransaksiBarangController);

router.delete("/:id", deleteTransaksiBarangController);

export default router;
