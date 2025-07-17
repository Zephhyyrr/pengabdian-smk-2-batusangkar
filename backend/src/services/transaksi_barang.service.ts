import prisma from "../config/prisma";
import { AppError } from "../errors/api_errors";

export const getAllTransaksiBarangService = async (
    tanggal?: string,
    bulan?: string,
    tahun?: string
) => {
    // Filter tanggal jika ada
    const filterTanggal: any = {};
    if (tanggal) {
        filterTanggal.tanggal = tanggal;
    } else if (bulan && tahun) {
        filterTanggal.tanggal = {
            gte: `${tahun}-${bulan.padStart(2, "0")}-01`,
            lt: `${tahun}-${String(Number(bulan) + 1).padStart(2, "0")}-01`,
        };
    } else if (tahun) {
        filterTanggal.tanggal = {
            gte: `${tahun}-01-01`,
            lt: `${Number(tahun) + 1}-01-01`,
        };
    }

    // Ambil semua transaksi barang
    const transaksi = await prisma.transaksiBarang.findMany({
        where: filterTanggal,
        include: {
            barang: true,
        },
        orderBy: {
            tanggal: "asc",
        },
    });

    // Pisahkan transaksi masuk dan keluar
    const barang_masuk = transaksi
        .filter((t) => t.masuk > 0)
        .map((t) => ({
            id_barang: t.id_barang,
            nama: t.barang.nama,
            satuan: t.barang.satuan,
            jumlah: t.masuk,
            keterangan: t.keterangan,
            tanggal: t.tanggal.toISOString().split("T")[0],
        }));

    const barang_keluar = transaksi
        .filter((t) => t.keluar > 0)
        .map((t) => ({
            id_barang: t.id_barang,
            nama: t.barang.nama,
            satuan: t.barang.satuan,
            jumlah: t.keluar,
            keterangan: t.keterangan,
            tanggal: t.tanggal.toISOString().split("T")[0],
        }));

    // Hitung total
    const totalMasuk = barang_masuk.reduce((sum, item) => sum + item.jumlah, 0);
    const totalKeluar = barang_keluar.reduce((sum, item) => sum + item.jumlah, 0);

    return {
        barang_masuk,
        barang_keluar,
        totalMasuk,
        totalKeluar,
    };
};

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
