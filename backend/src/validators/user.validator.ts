import { $Enums } from "@prisma/client";
import { body } from "express-validator";
import { existsEmail } from "../services/user.service";

const roleValues = Object.values($Enums.RoleUser)
export const createUserValidator = [
    body("email").notEmpty().withMessage("Email harus diisi.").bail()
        .isEmail().withMessage("Email tidak valid")
        .custom(async (email) => {
            const check = await existsEmail(email)
            if (check) throw new Error("Email sudah tersedia.")
            return true
        }),
    body("nama").notEmpty().withMessage("Nama harus diisi"),
    body("password").notEmpty().withMessage("Password harus diisi"),
    body("role").notEmpty().withMessage("Role harus diisi")
        .isIn(roleValues).withMessage(`Role harus salah satu dari ${roleValues.join(", ")}`),
];

export const updateUserValidator = [
    body("email").notEmpty().withMessage("Email harus diisi.").bail()
        .isEmail().withMessage("Email tidak valid")
        .custom(async (email, { req }) => {
            const check = await existsEmail(email, Number(req.params?.id))
            if (check) throw new Error("Email sudah tersedia.")
            return true
        }),
    body("nama").notEmpty().withMessage("Nama harus diisi"),
    body("password").optional()
        .notEmpty().withMessage("Password harus diisi"),
    body("role").notEmpty().withMessage("Role harus diisi").bail()
        .isIn(roleValues).withMessage(`Role harus salah satu dari ${roleValues.join(", ")}`),
];