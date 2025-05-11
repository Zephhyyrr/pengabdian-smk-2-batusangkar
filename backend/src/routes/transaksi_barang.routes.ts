import { Router } from "express";
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

router.post("/", createTransaksiBarangController);

router.put("/:id", updateTransaksiBarangController);

router.delete("/:id", deleteTransaksiBarangController);

export default router;
