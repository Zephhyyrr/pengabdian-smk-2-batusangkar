import { Request, Response } from "express";
import { handlerAnyError } from "../errors/api_errors";
import { addBarangService, getAllBarangService, getBarangByIdService, updateBarangService, deleteBarangService } from "../services/barang.service";

export const getAllBarangController = async (req: Request, res: Response) => {
    try {
        const barangs = await getAllBarangService()
        return res.status(200).json({
            success: true,
            message: "Berhasil mendapatkan data barang",
            data: barangs
        })
    } catch (error) {
        return handlerAnyError(error, res)
    }
}

export const getBarangByIdController = async (req: Request, res: Response) => {
    try {
        const barangById = await getBarangByIdService(Number(req.params.id))
        const { id } = req.params
        return res.status(200).json({
            success: true,
            message: `Berhasil mendapatkan data barang dengan id ${id}`,
            data: barangById
        })
    } catch (error) {
        return handlerAnyError(error, res)
    }
}

export const createBarangController = async (req: Request, res: Response) => {
    try {
        const { nama, satuan } = req.body
        const newBarang = await addBarangService(nama, satuan)
        return res.status(200).json({
            success: true,
            message: `Berhasil menambahkan barang: ${newBarang.nama}.`,
            data: newBarang
        })
    } catch (error) {
        return handlerAnyError(error, res)
    }
}

export const updateBarangController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { nama, satuan } = req.body
        const updatedBarang = await updateBarangService(Number(id), nama, satuan)
        return res.status(200).json({
            success: true,
            message: `Berhasil mengupdate barang: ${updatedBarang.nama}.`,
            data: updatedBarang
        })
    } catch (error) {
        return handlerAnyError(error, res)
    }
}

export const deleteBarangController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const deletedBarang = await deleteBarangService(Number(id))
        return res.status(200).json({
            success: true,
            message: `Berhasil menghapus barang: ${deletedBarang.nama}.`,
            data: deletedBarang
        })
    } catch (error) {
        return handlerAnyError(error, res)
    }
}