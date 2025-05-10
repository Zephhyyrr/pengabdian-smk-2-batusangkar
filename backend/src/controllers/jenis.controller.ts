import { Request, Response } from "express";
import { ResponseApiType } from "../types/api_types";
import { handlerAnyError } from "../errors/api_errors";
import { createJenisService, deleteJenisService, getAllJenisService, updateJenisService } from "../services/jenis.service";

export async function getAllJenisController(req: Request, res: Response<ResponseApiType>) {
    try {
        const jenis = await getAllJenisService();
        return res.status(200).json({
            success: true,
            message: "Berhasil mengembil semua jenis.",
            data: jenis
        })
    } catch (error) {
        return handlerAnyError(error, res)
    }
}

export async function createJenisController(req: Request, res: Response<ResponseApiType>) {
    try {
        const { name } = req.body
        const newJenis = await createJenisService(name)
        return res.status(201).json({
            success: true,
            message: `Berhasil jenis ${name}`,
            data: newJenis
        })
    } catch (error) {
        return handlerAnyError(error, res)
    }
}

export async function updateJenisController(req: Request, res: Response<ResponseApiType>) {
    try {
        const { id } = req.params
        const { name } = req.body
        const updatedJenis = await updateJenisService(Number(id), name)

        return res.status(200).json({
            success: true,
            message: `Berhasil memperbarui jenis: ${name} -> ${updatedJenis.name}`,
            data: updatedJenis
        })
    } catch (error) {
        return handlerAnyError(error, res)
    }
}

export async function deleteJenisController(req: Request, res: Response<ResponseApiType>) {
    try {
        const { id } = req.params
        const deletedJenis = await deleteJenisService(Number(id))
        return res.status(200).json({
            success: true,
            message: `Berhasil menghapus jenis: ${deletedJenis.name}`
        })
    } catch (error) {
        return handlerAnyError(error, res)
    }
}