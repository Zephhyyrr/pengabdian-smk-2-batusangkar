import { Request, Response } from "express";
import { ResponseApiType } from "../types/api_types";
import { handlerAnyError } from "../errors/api_errors";
import { createPenjualanService, getAllPenjualanService } from "../services/penjualan.service";

export async function getAllPenjualanController(req: Request, res: Response<ResponseApiType>) {
    try {
        const penjualans = await getAllPenjualanService()

        return res.status(200).json({
            success: true,
            message: "Berhasil mendapatkan data penjualan",
            data: penjualans
        })
    } catch (error) {
        return handlerAnyError(error, res)
    }
}

export async function createPenjualanController(req: Request, res: Response<ResponseApiType>) {
    try {
        const penjualans = await getAllPenjualanService()
        const { keterangan,
            id_komodity,
            id_produksi } = req.body;

        const newPenjualan = await createPenjualanService(keterangan, Number(id_komodity), Number(id_produksi))
        return res.status(200).json({
            success: true,
            message: "Berhasil mendapatkan data penjualan",
            data: penjualans
        })
    } catch (error) {
        return handlerAnyError(error, res)
    }
}
