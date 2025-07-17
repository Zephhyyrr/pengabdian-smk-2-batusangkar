import { Request, Response } from "express";
import { ResponseApiType } from "../types/api_types";
import { handlerAnyError } from "../errors/api_errors";
import { createdKomoditasService, deleteKomoditasService, getAllKomoditasService, getKomoditasByIdService, updateKomoditasService } from "../services/komoditas.service";
import cloudinary from "../config/cloudinary";
import { unlinkSync } from "fs"
import path from "path";

export async function createKomoditasController(req: Request, res: Response<ResponseApiType>) {
    try {
        const { id_jenis, nama, deskripsi, satuan, jumlah } = req.body
        const file = req.file;

        let fotoUrl = "";
        if (file && file.path) {
            const fullPath = path.resolve(file.path);
            const uploadResult = await cloudinary.uploader.upload(fullPath, {
                folder: "PengabdianSMK2Batusangkar/komoditas",
            });
            unlinkSync(fullPath);
            fotoUrl = uploadResult.secure_url;
        }

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
        let fotoUrl: string | undefined = undefined;

        // cek jika ada file yang diupload
        if (file && file.path) {
            const fullPath = path.resolve(file.path);
            const uploadResult = await cloudinary.uploader.upload(fullPath, {
                folder: "PengabdianSMK2Batusangkar/komoditas",
            });
            unlinkSync(fullPath);
            fotoUrl = uploadResult.secure_url;
        }

        // Ambil foto lama jika tidak ada file baru
        if (!fotoUrl) {
            const { foto } = await getKomoditasByIdService(Number(id));
            fotoUrl = foto;
        }

        const updatedKomoditas = await updateKomoditasService(
            Number(id),
            (Number(id_jenis) || undefined),
            nama,
            deskripsi,
            fotoUrl,
            satuan,
            jumlah ? Number(jumlah) : jumlah as number
        );

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

        // Ambil data komoditas dulu untuk dapat URL foto
        const komoditas = await getKomoditasByIdService(Number(id));
        const fotoUrl = komoditas.foto;

        // Ekstrak public_id dari URL Cloudinary
        // Contoh URL: https://res.cloudinary.com/demo/image/upload/v1234567890/folder/filename.jpg
        // public_id: folder/filename (tanpa ekstensi)
        const matches = fotoUrl.match(/\/([^\/]+\/[^\/]+)\.[a-zA-Z]+$/);
        const publicId = matches ? matches[1] : undefined;

        if (publicId) {
            await cloudinary.uploader.destroy(publicId);
        }

        const deletedKomoditas = await deleteKomoditasService(Number(id));
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