import { body } from "express-validator";

export const asalProduksiValidator = [
    body("nama")
        .notEmpty()
        .withMessage("Nama asal produksi wajib diisi")
        .isString()
        .withMessage("Nama harus berupa teks")
];
