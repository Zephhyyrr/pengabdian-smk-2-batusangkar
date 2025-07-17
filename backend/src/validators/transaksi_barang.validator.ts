import { body } from "express-validator";

export const transaksiBarangValidator = [
    body("id_barang")
        .notEmpty().withMessage("ID barang harus diisi.")
        .isInt({ gt: 0 }).withMessage("ID barang harus berupa angka positif."),

    body("tanggal")
        .notEmpty().withMessage("Tanggal harus diisi.")
        .isISO8601().withMessage("Format tanggal harus YYYY-MM-DD."),

    body("masuk")
        .optional()
        .isInt({ min: 0 }).withMessage("Jumlah masuk harus berupa angka >= 0."),

    body("keluar")
        .optional()
        .isInt({ min: 0 }).withMessage("Jumlah keluar harus berupa angka >= 0."),

    body("keterangan")
        .optional()
        .isString().withMessage("Keterangan harus berupa teks.")
];
