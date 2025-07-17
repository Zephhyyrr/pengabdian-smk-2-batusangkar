import prisma from "../config/prisma";

export async function getAllPenjualanService() {
    const penjualans = await prisma.penjualan.findMany({
        include: {
            Komoditas: {
                include: {
                    jenis: true
                }
            },
            Produksi: {
                include: {
                    asal_produksi: true
                }
            }
        }
    })

    return penjualans.map(penjualan=>{
        const { Komoditas, Produksi, ...rest } = penjualan;

        return {
            ...rest,
            komoditas: Komoditas,
            produksi: Produksi 
        }
    })
}

export async function createPenjualanService(
    keterangan: string,
    id_komodity: number,
    id_produksi: number
) {
    const newPenjualan = await prisma.penjualan.create({
        data: {
            keterangan,
            id_komodity,
            id_produksi,
        }
    })

    return newPenjualan
}

export async function getPenjualanByIdService(id: number) {
    const penjualan = await prisma.penjualan.findFirst({
        where: { id }
    })

    return penjualan
}

export async function updatePenjualanService(
    id: number,
    keterangan: string,
    id_komodity: number,
    id_produksi: number
) {
    const updated = await prisma.penjualan.update({
        where: { id },
        data: {
            keterangan,
            id_komodity,
            id_produksi
        }
    })

    return updated
}

export async function deletePenjualanService(id: number) {
    const deleted = await prisma.penjualan.delete({ where: { id } })

    return deleted
}