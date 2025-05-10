import { Request, Response } from "express";
import { handlerAnyError } from "../errors/api_errors";
import { addTransaksiBarangService, getAllTransaksiBarangService, getTransaksiBarangByIdService, updateTransaksiBarangService, deleteTransaksiBarangService } from "../services/transaksi_barang.service";

export const getAllTransaksiBarangController = async (req: Request, res: Response) => {
    try {
        const { tanggal, bulan, tahun } = req.query;

        const result = await getAllTransaksiBarangService(
            tanggal as string,
            bulan as string,
            tahun as string
        );

        // Cek jika data kosong
        if (result.transaksi.length === 0) {
            let detail = "Data transaksi tidak ditemukan";

            if (tanggal) detail += ` pada tanggal ${tanggal}`;
            else if (bulan && tahun) detail += ` pada bulan ${bulan}-${tahun}`;
            else if (tahun) detail += ` pada tahun ${tahun}`;

            return res.status(404).json({
                success: false,
                message: detail,
                data: [],
                totalMasuk: 0,
                totalKeluar: 0
            });
        }

        return res.status(200).json({
            success: true,
            message: "Berhasil mendapatkan data semua transaksi barang",
            data: result.transaksi,
            totalMasuk: result.totalMasuk,
            totalKeluar: result.totalKeluar
        });
    } catch (error) {
        return handlerAnyError(error, res);
    }
};


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
