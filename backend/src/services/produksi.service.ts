import prisma from "../config/prisma";
import { AppError } from "../errors/api_errors";

export async function getAllProduksiService() {
    const produksis = await prisma.produksi.findMany({
        include: {
            penjualans: true,
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
    kode_produksi: string,
    ukuran: string,
    kualitas: string
) {
    return await prisma.produksi.create({
        data: {
            id_asal,
            kode_produksi,
            ukuran,
            kualitas
        }
    });
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
