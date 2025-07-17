import prisma from "../config/prisma";
import { AppError } from "../errors/api_errors";

export async function getAllTransaksiBarangService(
    tanggal?: string,
    bulan?: string,
    tahun?: string
) {
    let where: any = {};

    if (tanggal) {
        const date = new Date(tanggal);
        if (isNaN(date.getTime())) throw new AppError("Format tanggal tidak valid.");
        const nextDay = new Date(date);
        nextDay.setDate(date.getDate() + 1);
        where.tanggal = { gte: date, lt: nextDay };
    } else if (bulan && tahun) {
        const start = new Date(`${tahun}-${bulan}-01`);
        if (isNaN(start.getTime())) throw new AppError("Format bulan/tahun tidak valid.");
        const end = new Date(start);
        end.setMonth(start.getMonth() + 1);
        where.tanggal = { gte: start, lt: end };
    } else if (tahun) {
        const start = new Date(`${tahun}-01-01`);
        const end = new Date(`${Number(tahun) + 1}-01-01`);
        where.tanggal = { gte: start, lt: end };
    }

    const transaksi = await prisma.transaksiBarang.findMany({
        where,
        include: { barang: true },
        orderBy: { tanggal: "desc" },
    });

    const barangMap = new Map<
        number,
        {
            id: number;
            nama: string;
            satuan: string;
            masuk: number;
            keluar: number;
        }
    >();

    let totalMasuk = 0;
    let totalKeluar = 0;

    for (const t of transaksi) {
        totalMasuk += t.masuk;
        totalKeluar += t.keluar;

        const existing = barangMap.get(t.barang.id);
        if (existing) {
            existing.masuk += t.masuk;
            existing.keluar += t.keluar;
        } else {
            barangMap.set(t.barang.id, {
                id: t.barang.id,
                nama: t.barang.nama,
                satuan: t.barang.satuan,
                masuk: t.masuk,
                keluar: t.keluar,
            });
        }
    }

    return {
        barang: Array.from(barangMap.values()),
        totalMasuk,
        totalKeluar,
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
