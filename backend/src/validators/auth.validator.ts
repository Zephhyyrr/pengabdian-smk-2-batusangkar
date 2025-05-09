import { body } from "express-validator";

export const loginValidator = [
    body("email").notEmpty().withMessage("Email harus diisi."),
    body("password").notEmpty().withMessage("Password harus diisi")
]