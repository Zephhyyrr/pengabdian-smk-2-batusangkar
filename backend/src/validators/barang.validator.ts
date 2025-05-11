import { body } from "express-validator";

export const barangValidator = [
    body("nama").notEmpty().withMessage("Nama barang harus diisi."),
    body("satuan").notEmpty().withMessage("Satuan barang harus diisi.")
]