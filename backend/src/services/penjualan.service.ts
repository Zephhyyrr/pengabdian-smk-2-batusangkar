import prisma from "../config/prisma";
import { AppError } from "../errors/api_errors";

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

    return penjualans.map(penjualan => {
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
    id_produksi: number,
    jumlah_terjual: number
) {
    const komoditas = await prisma.komoditas.findUnique({ where: { id: id_komodity } });
    if (!komoditas) throw new AppError("Komoditas tidak ditemukan", 404);

    if (komoditas.jumlah < jumlah_terjual) {
        throw new AppError("Stok komoditas tidak mencukupi", 400);
    }

    const produksi = await prisma.produksi.findUnique({ where: { id: id_produksi  } });
    if (!produksi) {
        throw new AppError("Produksi tidak ditemukan", 400)
    }

    await prisma.komoditas.update({
        where: { id: id_komodity },
        data: {
            jumlah: komoditas.jumlah - jumlah_terjual
        }
    });
    await prisma.produksi.update({
        where: { id: id_produksi },
        data: {
            jumlah: produksi.jumlah - jumlah_terjual
        }
    });

    const newPenjualan = await prisma.penjualan.create({
        data: {
            keterangan,
            jumlah_terjual,
            Komoditas: {
                connect: { id: id_komodity }
            },
            Produksi: {
                connect: { id: id_produksi }
            }
        }
    });

    return newPenjualan;
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