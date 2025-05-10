import prisma from "../config/prisma";
import { AppError } from "../errors/api_errors";

export async function getAllTransaksiBarangService(
    tanggal?: string,
    bulan?: string,
    tahun?: string
) {
    let where: any = {};

    if (tanggal) {
        // Validasi format tanggal
        // format tanggal: YYYY-MM-DD
        // contoh: 2025-05-10
        const date = new Date(tanggal);
        if (isNaN(date.getTime())) throw new AppError("Format tanggal tidak valid.");
        const nextDay = new Date(date);
        nextDay.setDate(date.getDate() + 1);
        where.tanggal = { gte: date, lt: nextDay };
    } else if (bulan && tahun) {
        // Validasi format bulan dan tahun
        // format bulan: YYYY-MM
        // contoh: 2025-05
        const start = new Date(`${tahun}-${bulan}-01`);
        if (isNaN(start.getTime())) throw new AppError("Format bulan/tahun tidak valid.");
        const end = new Date(start);
        end.setMonth(start.getMonth() + 1);
        where.tanggal = { gte: start, lt: end };
    } else if (tahun) {
        // Validasi format tahun
        // format tahun: YYYY
        // contoh: 2025
        const start = new Date(`${tahun}-01-01`);
        const end = new Date(`${Number(tahun) + 1}-01-01`);
        where.tanggal = { gte: start, lt: end };
    }

    const transaksi = await prisma.transaksiBarang.findMany({
        where,
        include: { barang: true },
        orderBy: { tanggal: "desc" }
    });

    const totalMasuk = await prisma.transaksiBarang.aggregate({
        where,
        _sum: { masuk: true }
    });

    const totalKeluar = await prisma.transaksiBarang.aggregate({
        where,
        _sum: { keluar: true }
    });

    return {
        transaksi,
        totalMasuk: totalMasuk._sum.masuk ?? 0,
        totalKeluar: totalKeluar._sum.keluar ?? 0
    };
}


export async function getTransaksiBarangByIdService(id: number) {
    const transaksi = await findTransaksiById(id);
    return transaksi;
}

export async function addTransaksiBarangService(
    id_barang: number,
    tanggal: Date,
    masuk: number,
    keluar: number,
    keterangan: string
) {
    const newTransaksi = await prisma.transaksiBarang.create({
        data: {
            id_barang,
            tanggal,
            masuk,
            keluar,
            keterangan
        }
    });

    return newTransaksi;
}

export async function updateTransaksiBarangService(
    id: number,
    id_barang: number,
    tanggal: Date,
    masuk: number,
    keluar: number,
    keterangan: string
) {
    await findTransaksiById(id);

    const updated = await prisma.transaksiBarang.update({
        where: { id },
        data: {
            id_barang,
            tanggal,
            masuk,
            keluar,
            keterangan
        }
    });

    return updated;
}

export async function deleteTransaksiBarangService(id: number) {
    await findTransaksiById(id);

    const deleted = await prisma.transaksiBarang.delete({
        where: { id }
    });

    return deleted;
}

const findTransaksiById = async (id: number) => {
    const transaksi = await prisma.transaksiBarang.findUnique({
        where: { id },
        include: { barang: true }
    });

    if (!transaksi) {
        throw new AppError(`Transaksi dengan id: ${id} tidak ditemukan.`);
    }

    return transaksi;
};
