import { Request, Response } from "express";
import { ResponseApiType } from "../types/api_types";
import { handlerAnyError } from "../errors/api_errors";
import { verifyHash } from "../utils/bcrypt";
import { existsEmail } from "../services/user.service";
import { generateToken } from "../utils/jwt";

export async function loginController(req: Request, res: Response<ResponseApiType>) {
    try {
        const { email, password } = req.body

        const user = await existsEmail(email);

        const isPasswardMatch = await verifyHash(password, user?.password!)
        if (!isPasswardMatch) {
            return res.status(400).json({
                success: false,
                message: "Login gagal, cek email dan password."
            })
        }

        const token = await generateToken({ id: user?.id!, nama: user?.nama!, email: user?.email!, role: user?.role! })
        return res.status(200).json({
            success: true,
            message: "Login berhasil",
            data: { token }
        })
    } catch (error) {
        return handlerAnyError(error, res)
    }
}