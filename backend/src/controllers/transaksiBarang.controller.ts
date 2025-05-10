import { Request, Response } from "express";
import { handlerAnyError } from "../errors/api_errors";
import { addTransaksiBarangService, getAllTransaksiBarangService, getTransaksiBarangByIdService, updateTransaksiBarangService, deleteTransaksiBarangService } from "../services/transaksiBarang.service";

export const getAllTransaksiBarangController = async (req: Request, res: Response) => {
    try {
        const { tanggal, bulanTahun, tahun } = req.query;

        const result = await getAllTransaksiBarangService(
            tanggal as string,
            bulanTahun as string,
            tahun as string
        );

        const dataKosong = result.transaksi.length === 0;

        let message = "Berhasil mendapatkan data semua transaksi barang";

        if (dataKosong) {
            if (tanggal) {
                message = `Tidak ditemukan data transaksi pada tanggal ${tanggal}`;
            } else if (bulanTahun) {
                message = `Tidak ditemukan data transaksi pada bulan dan tahun ${bulanTahun}`;
            } else if (tahun) {
                message = `Tidak ditemukan data transaksi pada tahun ${tahun}`;
            } else {
                message = "Tidak ditemukan data transaksi barang";
            }
        }

        return res.status(200).json({
            success: true,
            message,
            data: result.transaksi,
            totalMasuk: result.totalMasuk ?? 0,
            totalKeluar: result.totalKeluar ?? 0
        });
    } catch (error) {
        return handlerAnyError(error, res);
    }
}

export const getTransaksiBarangByIdController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const transaksi = await getTransaksiBarangByIdService(Number(id));
        return res.status(200).json({
            success: true,
            message: `Berhasil mendapatkan data transaksi barang dengan id ${id}`,
            data: transaksi
        });
    } catch (error) {
        return handlerAnyError(error, res);
    }
};

export const createTransaksiBarangController = async (req: Request, res: Response) => {
    try {
        const { id_barang, tanggal, masuk, keluar, keterangan } = req.body;
        const newTransaksi = await addTransaksiBarangService(
            Number(id_barang),
            new Date(tanggal),
            Number(masuk),
            Number(keluar),
            keterangan
        );

        return res.status(200).json({
            success: true,
            message: `Berhasil menambahkan transaksi untuk barang dengan id ${id_barang}`,
            data: newTransaksi
        });
    } catch (error) {
        return handlerAnyError(error, res);
    }
};

export const updateTransaksiBarangController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { id_barang, tanggal, masuk, keluar, keterangan } = req.body;
        const updated = await updateTransaksiBarangService(
            Number(id),
            Number(id_barang),
            new Date(tanggal),
            Number(masuk),
            Number(keluar),
            keterangan
        );

        return res.status(200).json({
            success: true,
            message: `Berhasil mengupdate transaksi dengan id ${id}`,
            data: updated
        });
    } catch (error) {
        return handlerAnyError(error, res);
    }
};

export const deleteTransaksiBarangController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await deleteTransaksiBarangService(Number(id));

        return res.status(200).json({
            success: true,
            message: `Berhasil menghapus transaksi dengan id ${id}`,
            data: deleted
        });
    } catch (error) {
        return handlerAnyError(error, res);
    }
};
