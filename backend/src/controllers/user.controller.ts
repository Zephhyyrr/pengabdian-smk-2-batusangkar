import { Request, Response } from "express";
import { ResponseApiType } from "../types/api_types";
import { addUserService, deleteUserService, getAllUserService, updateUserService } from "../services/user.service";
import { handlerAnyError } from "../errors/api_errors";
import { hashing } from "../utils/bcrypt";

export async function getAlluserController(req: Request, res: Response<ResponseApiType>) {
    try {
        const users = await getAllUserService()
        return res.status(200).json({
            success: true,
            message: "Mendapatkan data user.",
            data: users
        })
    } catch (error) {
        return handlerAnyError(error, res)
    }
}

export async function updateUserController(req: Request, res: Response<ResponseApiType>) {
    try {
        const { id } = req.params
        const { email, nama, password, role } = req.body

        const hashedPassword = password ? await hashing(password) : undefined
        const updatedUser = await updateUserService(Number(id), email, nama, hashedPassword!, role)
        return res.status(200).json({
            success: true,
            message: `Berhasil mengupdate user: ${updatedUser.nama}.`,
            data: updatedUser
        })
    } catch (error) {
        return handlerAnyError(error, res)
    }
}

export async function createUserController(req: Request, res: Response<ResponseApiType>) {
    try {
        const { email, nama, password, role } = req.body

        const hashedPassword = await hashing(password)
        const newUser = await addUserService(email, nama, hashedPassword!, role)
        return res.status(200).json({
            success: true,
            message: `Berhasil manambahkan user: ${newUser.nama}.`,
            data: newUser
        })
    } catch (error) {
        return handlerAnyError(error, res)
    }
}

export async function deleteUserController(req: Request, res: Response<ResponseApiType>) {
    try {
        const { id } = req.params
        if (Number(id) == req.user?.id) {
            return res.status(400).json({
                success: false,
                message: "Tidak bisa menghapus akun sendiri."
            })
        }
        const deletedUser = await deleteUserService(Number(id))

        return res.status(200).json({
            success: true,
            message: `Berhasil menghapus user: ${deletedUser.nama}`
        })
    } catch (error) {
        return handlerAnyError(error, res)
    }
}