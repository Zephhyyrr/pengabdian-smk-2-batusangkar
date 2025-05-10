import prisma from "../config/prisma";
import { AppError } from "../errors/api_errors";

export async function getAllTransaksiBarangService(
    tanggal?: string,
    bulanTahun?: string,
    tahun?: string
) {
    let where: any = {};

    if (tanggal) {
        // Cari berdasarkan tanggal
        // Format tanggal harus dd-MM-yyyy
        // Misal: 10=05-2023
        const parts = tanggal.split("-");
        if (parts.length !== 3) throw new AppError("Format tanggal harus dd-MM-yyyy.");
        const [day, month, year] = parts;
        const start = new Date(`${year}-${month}-${day}`);
        const end = new Date(start);
        end.setDate(start.getDate() + 1);
        where.tanggal = { gte: start, lt: end };
    } else if (bulanTahun) {
        // Cari berdasarkan bulan dan tahun
        // Format bulanTahun harus MM-yyyy
        // Misal: 05-2023
        const parts = bulanTahun.split("-");
        if (parts.length !== 2) throw new AppError("Format bulanTahun harus MM-yyyy.");
        const [month, year] = parts;
        const start = new Date(`${year}-${month}-01`);
        const end = new Date(start);
        end.setMonth(start.getMonth() + 1);
        where.tanggal = { gte: start, lt: end };
    } else if (tahun) {
        // Cari berdasarkan tahun
        // Format tahun harus yyyy
        // Misal: 2025
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
