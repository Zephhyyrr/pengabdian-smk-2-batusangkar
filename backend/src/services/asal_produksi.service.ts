import prisma from "../config/prisma";
import { AppError } from "../errors/api_errors";

export async function getAllAsalProduksiService() {
    return await prisma.asalProduksi.findMany({
        orderBy: { createdAt: "desc" }
    });
}

export async function getByIdAsalProduksiService(id: number) {
    const asalProduksi = await prisma.asalProduksi.findUnique({
        where: { id }
    });
    if (!asalProduksi) throw new AppError("Asal produksi tidak ditemukan", 404);
    return asalProduksi;
}

export async function createAsalProduksiService(nama: string) {
    return await prisma.asalProduksi.create({
        data: { nama }
    });
}

export async function updateAsalProduksiService(id: number, nama: string) {
    const existing = await prisma.asalProduksi.findUnique({ where: { id } });
    if (!existing) throw new AppError("Asal produksi tidak ditemukan", 404);

    return await prisma.asalProduksi.update({
        where: { id },
        data: { nama }
    });
}

export async function deleteAsalProduksiService(id: number) {
    const deleted = await prisma.asalProduksi.delete({ where: { id } });
    return deleted;
}
