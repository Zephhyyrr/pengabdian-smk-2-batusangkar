import { body } from "express-validator";

export const produksiValidator = [
    body("id_asal")
        .notEmpty()
        .withMessage("ID asal produksi wajib diisi")
        .isInt({ gt: 0 })
        .withMessage("ID asal produksi harus berupa angka positif"),

    body("kode_produksi")
        .notEmpty()
        .withMessage("Kode produksi wajib diisi")
        .isString()
        .withMessage("Kode produksi harus berupa string"),

    body("ukuran")
        .notEmpty()
        .withMessage("Ukuran wajib diisi")
        .isString()
        .withMessage("Ukuran harus berupa string"),

    body("kualitas")
        .notEmpty()
        .withMessage("Kualitas wajib diisi")
        .isString()
        .withMessage("Kualitas harus berupa string")
];
