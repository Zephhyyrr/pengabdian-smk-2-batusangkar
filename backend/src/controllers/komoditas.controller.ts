import { Request, Response } from "express";
import { ResponseApiType } from "../types/api_types";
import { handlerAnyError } from "../errors/api_errors";
import { createdKomoditasService, deleteKomoditasService, getAllKomoditasService, getKomoditasByIdService, updateKomoditasService } from "../services/komoditas.service";
import cloudinary from "../config/cloudinary";

async function uploadBufferToCloudinary(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "PengabdianSMK2Batusangkar/komoditas",
                resource_type: "auto", // Otomatis detect tipe file
            },
            (error, result) => {
                if (error) {
                    reject(new Error(`Upload gagal: ${error.message}`));
                } else if (result) {
                    resolve(result.secure_url);
                } else {
                    reject(new Error('Upload gagal: No result returned'));
                }
            }
        );

        // Upload buffer langsung ke Cloudinary
        uploadStream.end(file.buffer);
    });
}

export async function createKomoditasController(req: Request, res: Response<ResponseApiType>) {
    try {
        const { id_jenis, nama, deskripsi, satuan, jumlah } = req.body;
        const file = req.file;

        let fotoUrl = "";

        if (file?.buffer) {
            fotoUrl = await uploadBufferToCloudinary(file);
        }

        const newKomoditas = await createdKomoditasService(
            Number(id_jenis),
            nama,
            deskripsi,
            fotoUrl,
            satuan,
            0
        );

        return res.status(201).json({
            success: true,
            message: `Berhasil menambahkan komoditas baru: ${newKomoditas.nama}`,
            data: newKomoditas
        });

    } catch (error) {
        return handlerAnyError(error, res);
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
        const { id } = req.params;
        const { id_jenis, nama, deskripsi, satuan } = req.body;
        const file = req.file;

        let foto: string | undefined = undefined;

        if (file?.buffer) {
            foto = await uploadBufferToCloudinary(file);
        }

        if (!foto) {
            try {
                const existingKomoditas = await getKomoditasByIdService(Number(id));
                foto = existingKomoditas.foto;
            } catch (error) {
                console.error("Gagal mengambil data komoditas existing:", error);
            }
        }

        const updatedKomoditas = await updateKomoditasService(
            Number(id),
            id_jenis ? Number(id_jenis) : undefined,
            nama,
            deskripsi,
            foto ?? "",
            satuan,
        );

        return res.status(200).json({
            success: true,
            message: `Berhasil update komoditas: ${nama}`,
            data: updatedKomoditas
        });

    } catch (error) {
        return handlerAnyError(error, res);
    }
}

export async function deleteKomoditasController(req: Request, res: Response<ResponseApiType>) {
    try {
        const { id } = req.params;

        const komoditas = await getKomoditasByIdService(Number(id));
        const fotoUrl = komoditas.foto;

        const matches = fotoUrl.match(/\/([^\/]+\/[^\/]+)\.[a-zA-Z]+$/);
        const publicId = matches ? matches[1] : undefined;

        if (publicId) {
            try {
                await cloudinary.uploader.destroy(publicId);
            } catch (cloudErr) {
                console.warn(`Gagal menghapus gambar dari Cloudinary: ${cloudErr}`);
            }
        }

        const deletedKomoditas = await deleteKomoditasService(Number(id));

        return res.status(200).json({
            success: true,
            message: `Berhasil menghapus komoditas: ${deletedKomoditas.nama}`
        });
    } catch (error) {
        return handlerAnyError(error, res);
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