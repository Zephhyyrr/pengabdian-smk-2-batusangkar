import { Request, Response } from "express";
import { ResponseApiType } from "../types/api_types";
import { handlerAnyError } from "../errors/api_errors";
import {
    getAllProduksiService,
    getProduksiByIdService,
    addProduksiService,
    updateProduksiService,
    deleteProduksiService
} from "../services/produksi.service";

export async function getAllProduksiController(req: Request, res: Response<ResponseApiType>) {
    try {
        const produksis = await getAllProduksiService();
        return res.status(200).json({
            success: true,
            message: "Berhasil mengambil semua data produksi.",
            data: produksis
        });
    } catch (error) {
        return handlerAnyError(error, res);
    }
}

export async function getProduksiByIdController(req: Request, res: Response<ResponseApiType>) {
    try {
        const { id } = req.params;
        const produksi = await getProduksiByIdService(Number(id));
        return res.status(200).json({
            success: true,
            message: `Berhasil mengambil data produksi dengan id ${id}`,
            data: produksi
        });
    } catch (error) {
        return handlerAnyError(error, res);
    }
}

export async function createProduksiController(req: Request, res: Response<ResponseApiType>) {
    try {
        const { id_asal, id_komoditas, kode_produksi, ukuran, kualitas, jumlah_diproduksi } = req.body;
        const newProduksi = await addProduksiService(
            Number(id_asal),
            Number(id_komoditas),
            kode_produksi,
            ukuran,
            kualitas,
            Number(jumlah_diproduksi)
        );

        return res.status(201).json({
            success: true,
            message: `Berhasil menambahkan produksi: ${newProduksi.kode_produksi}`,
            data: newProduksi
        });
    } catch (error) {
        return handlerAnyError(error, res);
    }
}

export async function updateProduksiController(req: Request, res: Response<ResponseApiType>) {
    try {
        const { id } = req.params;
        const { id_asal, kode_produksi, ukuran, kualitas } = req.body;
        const updatedProduksi = await updateProduksiService(Number(id), id_asal, kode_produksi, ukuran, kualitas);

        return res.status(200).json({
            success: true,
            message: `Berhasil memperbarui produksi: ${kode_produksi} -> ${updatedProduksi.kode_produksi}`,
            data: updatedProduksi
        });
    } catch (error) {
        return handlerAnyError(error, res);
    }
}

export async function deleteProduksiController(req: Request, res: Response<ResponseApiType>) {
    try {
        const { id } = req.params;
        const deletedProduksi = await deleteProduksiService(Number(id));

        return res.status(200).json({
            success: true,
            message: `Berhasil menghapus produksi: ${deletedProduksi.kode_produksi}`
        });
    } catch (error) {
        return handlerAnyError(error, res);
    }
}
