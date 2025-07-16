import { Request, Response } from "express";
import { ResponseApiType } from "../types/api_types";
import {
    getAllAsalProduksiService,
    createAsalProduksiService,
    updateAsalProduksiService,
    deleteAsalProduksiService
} from "../services/asal_produksi.service";
import { handlerAnyError } from "../errors/api_errors";

export async function getAllAsalProduksiController(req: Request, res: Response<ResponseApiType>) {
    try {
        const result = await getAllAsalProduksiService();
        return res.status(200).json({
            success: true,
            message: "Berhasil mengambil semua asal produksi.",
            data: result
        });
    } catch (error) {
        return handlerAnyError(error, res);
    }
}

export async function createAsalProduksiController(req: Request, res: Response<ResponseApiType>) {
    try {
        const { nama } = req.body;
        const newData = await createAsalProduksiService(nama);
        return res.status(201).json({
            success: true,
            message: `Berhasil menambahkan asal produksi: ${newData.nama}`,
            data: newData
        });
    } catch (error) {
        return handlerAnyError(error, res);
    }
}

export async function updateAsalProduksiController(req: Request, res: Response<ResponseApiType>) {
    try {
        const { id } = req.params;
        const { nama } = req.body;
        const updated = await updateAsalProduksiService(Number(id), nama);

        return res.status(200).json({
            success: true,
            message: `Berhasil memperbarui asal produksi: ${updated.nama}`,
            data: updated
        });
    } catch (error) {
        return handlerAnyError(error, res);
    }
}

export async function deleteAsalProduksiController(req: Request, res: Response<ResponseApiType>) {
    try {
        const { id } = req.params;
        const deleted = await deleteAsalProduksiService(Number(id));
        return res.status(200).json({
            success: true,
            message: `Berhasil menghapus asal produksi: ${deleted.nama}`
        });
    } catch (error) {
        return handlerAnyError(error, res);
    }
}
