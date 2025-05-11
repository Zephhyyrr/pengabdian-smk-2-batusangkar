import prisma from "../config/prisma";
import { AppError } from "../errors/api_errors";


export async function getAllBarangService() {
    const barangs = await prisma.barang.findMany()
    return barangs
}

export async function getBarangByIdService(id: number) {
    const barangs = await findBarangById(id)
    return barangs
}

export async function addBarangService(nama: string, satuan: string) {
    const newBarang = await prisma.barang.create({
        data: { nama, satuan },
    })

    return newBarang
}

export async function updateBarangService(id: number, nama: string, satuan: string) {
    const updated = await prisma.barang.update({
        where: { id },
        data: { nama, satuan },
    })

    return updated
}

export async function deleteBarangService(id: number) {
    await findBarangById(id)
    const deleted = await prisma.barang.delete({ where: { id } })

    return deleted
}

const findBarangById = async (id: number) => {
    const barang = await prisma.barang.findUnique({ where: { id } })
    if (!barang) throw new AppError(`Barang dengan id: ${id}, tidak tersedia.`)
    return barang
}

