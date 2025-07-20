import prisma from "../config/prisma";
import { AppError } from "../errors/api_errors";

export async function getAllProduksiService() {
    const produksis = await prisma.produksi.findMany({
        include: {
            penjualans: true,
            komoditas: true,
            asal_produksi: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    return produksis;
}

export async function getProduksiByIdService(id: number) {
    const produksi = await prisma.produksi.findUnique({
        where: { id },
        include: {
            penjualans: true,
            asal_produksi: true
        }
    });

    if (!produksi) throw new AppError("Produksi tidak ditemukan", 404);
    return produksi;
}

export async function addProduksiService(
    id_asal: number,
    id_komoditas: number,
    kode_produksi: string,
    ukuran: string,
    kualitas: string,
    jumlah_diproduksi: number
) {
    // Validasi jumlah_diproduksi
    if (
        typeof jumlah_diproduksi !== "number" ||
        isNaN(jumlah_diproduksi) ||
        jumlah_diproduksi <= 0
    ) {
        throw new AppError("Jumlah diproduksi harus berupa angka > 0", 400);
    }

    const komoditas = await prisma.komoditas.findUnique({
        where: { id: id_komoditas }
    });
    if (!komoditas) throw new AppError("Komoditas tidak ditemukan", 404);

    await prisma.komoditas.update({
        where: { id: id_komoditas },
        data: {
            jumlah: {
                increment: jumlah_diproduksi
            }
        }
    });

    const produksi = await prisma.produksi.create({
        data: {
            id_asal,
            id_komoditas,
            kode_produksi,
            ukuran,
            kualitas,
            jumlah: jumlah_diproduksi
        }
    });

    return produksi;
}

export async function updateProduksiService(
    id: number,
    id_asal: number,
    kode_produksi: string,
    ukuran: string,
    kualitas: string
) {
    const check = await prisma.produksi.findUnique({ where: { id } });
    if (!check) throw new AppError("Produksi tidak ditemukan", 404);

    return await prisma.produksi.update({
        where: { id },
        data: {
            id_asal,
            kode_produksi,
            ukuran,
            kualitas
        }
    });
}

export async function deleteProduksiService(id: number) {
    const deleted = await prisma.produksi.delete({ where: { id } });
    return deleted;
}
