import { Request, Response } from "express";
import { ResponseApiType } from "../types/api_types";
import { handlerAnyError } from "../errors/api_errors";
import { deleteFileFromDrive, uploadFileToDrive } from "../services/google_drive.service";
import { createdKomoditasService, deleteKomoditasService, getAllKomoditasService, getKomoditasByIdService, updateKomoditasService } from "../services/komoditas.service";

export async function createKomoditasController(req: Request, res: Response<ResponseApiType>) {
    try {
        const { id_jenis, nama, deskripsi, satuan, jumlah } = req.body
        const file = req.file

        const fileBuffer = file?.buffer!;
        const fileName = file?.originalname!;
        const mimeType = file?.mimetype!;
        const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID || ""

        const uploadResult = await uploadFileToDrive(fileBuffer, fileName, mimeType, folderId)
        const fotoUrl = `https://drive.google.com/uc?id=${uploadResult.id}`
        const newKomoditas = await createdKomoditasService(Number(id_jenis), nama, deskripsi, fotoUrl, satuan, Number(jumlah))

        return res.status(201).json({
            success: true,
            message: `Berhasil menambahkan komoditas baru: .${newKomoditas.nama}`,
            data: newKomoditas
        })
    } catch (error) {
        return handlerAnyError(error, res)
    }
}

export async function getAllKomoditasController(req: Request, res: Response<ResponseApiType>) {
    try {
        const komoditas = (await getAllKomoditasService()).map((komoditas) => ({
            "id": komoditas.id,
            "id_jenis": komoditas.id_jenis,
            "jenis": komoditas.jenis,
            "nama": komoditas.nama,
            "deskripsi": komoditas.deskripsi,
            "foto": komoditas.foto,
            "satuan": komoditas.satuan,
            "jumlah": komoditas.jumlah,
            "createdAt": komoditas.createdAt,
            "updatedAt": komoditas.updatedAt
        }))

        return res.status(200).json({
            success: true,
            message: "Berhasil mengambil data.",
            data: komoditas
        })
    } catch (error) {
        return handlerAnyError(error, res)
    }
}

export async function updateKomoditasController(req: Request, res: Response<ResponseApiType>) {
    try {
        const { id } = req.params
        const { id_jenis, nama, deskripsi, satuan, jumlah } = req.body

        const file = req?.file;
        let fotoUrl = undefined;

        // cek jika ada file yang diupload
        if (file !== undefined) {

            const { foto } = await getKomoditasByIdService((Number(id)))
            const fileID = foto.split("=")[1]

            await deleteFileFromDrive(fileID)
            const fileBuffer = file?.buffer!;
            const fileName = file?.originalname!;
            const mimeType = file?.mimetype!;
            const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID || ""

            const uploadResult = await uploadFileToDrive(fileBuffer, fileName, mimeType, folderId)
            fotoUrl = `https://drive.google.com/uc?id=${uploadResult.id}`
        }

        const updatedKomoditas = await updateKomoditasService(Number(id), (Number(id_jenis) || undefined), nama, deskripsi, fotoUrl!, satuan, jumlah ? Number(jumlah) : jumlah as number)

        return res.status(200).json({
            success: true,
            message: `Berhasil update komoditas: ${nama}`,
            data: updatedKomoditas
        })
    } catch (error) {
        return handlerAnyError(error, res)
    }
}

export async function deleteKomoditasController(req: Request, res: Response<ResponseApiType>) {
    try {
        const { id } = req.params

        const deletedKomoditas = await deleteKomoditasService(Number(id))
        const fileID = deletedKomoditas.foto.split("=")[1]
        await deleteFileFromDrive(fileID)
        return res.status(200).json({
            success: true,
            message: `Berhasil menghapus komoditas: ${deletedKomoditas.nama}`
        })
    } catch (error) {
        return handlerAnyError(error, res)
    }
}

export async function getKomoditasByIdController(req: Request, res: Response<ResponseApiType>) {
    try {
        const { id } = req.params

        const komoditas = await getKomoditasByIdService(Number(id))

        return res.status(200).json({
            success: true,
            message: `Berhasil mendapatkan komoditas dengan id: ${id}`,
            data: komoditas
        })
    } catch (error) {
        return handlerAnyError(error, res)
    }
}