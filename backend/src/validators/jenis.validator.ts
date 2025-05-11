import { body } from "express-validator";

export const jenisValidator = [
    body("name").notEmpty().withMessage("Nama jenis harus diisi.")
]