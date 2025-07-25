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
    jumlah_diproduksi: number,
    harga_persatuan: number,
) {
    if (
        typeof jumlah_diproduksi !== "number" ||
        isNaN(jumlah_diproduksi) ||
        jumlah_diproduksi <= 0
    ) {
        throw new AppError("Jumlah diproduksi harus berupa angka > 0", 400);
    }

    if (
        typeof harga_persatuan !== "number" ||
        isNaN(harga_persatuan) ||
        harga_persatuan <= 0
    ) {
        throw new AppError("Harga persatuan harus berupa angka >= 0", 400);
    }

    const komoditas = await prisma.komoditas.findUnique({
        where: { id: id_komoditas }
    });

    if (!komoditas) {
        throw new AppError("Komoditas tidak ditemukan", 404);
    }

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
            jumlah: jumlah_diproduksi,
            harga_persatuan
        }
    });

    return produksi;
}

export async function updateProduksiService(
    id: number,
    id_asal: number,
    kode_produksi: string,
    ukuran: string,
    kualitas: string,
    jumlah: number,
    harga_persatuan: number
) {
    const produksi = await prisma.produksi.findUnique({ where: { id } });
    if (!produksi) throw new AppError("Produksi tidak ditemukan", 404);

    if (produksi.id_komoditas) {
        const komoditas = await prisma.komoditas.findUnique({ where: { id: produksi.id_komoditas } });
        if (!komoditas) throw new AppError("Komoditas tidak ditemukan", 404);

        const selisih = jumlah - produksi.jumlah;
        if (selisih !== 0) {
            await prisma.komoditas.update({
                where: { id: produksi.id_komoditas },
                data: {
                    jumlah: {
                        increment: selisih
                    }
                }
            });
        }
    }

    return await prisma.produksi.update({
        where: { id },
        data: {
            id_asal,
            kode_produksi,
            ukuran,
            kualitas,
            jumlah,
            harga_persatuan
        }
    });
}

export async function deleteProduksiService(id: number) {
    // Ambil data produksi sebelum dihapus
    const produksi = await prisma.produksi.findUnique({ where: { id } });
    if (!produksi) throw new AppError("Produksi tidak ditemukan", 404);

    // Jika id_komoditas ada, kurangi jumlah di komoditas
    if (produksi.id_komoditas) {
        const komoditas = await prisma.komoditas.findUnique({ where: { id: produksi.id_komoditas } });
        if (!komoditas) throw new AppError("Komoditas tidak ditemukan", 404);

        await prisma.komoditas.update({
            where: { id: produksi.id_komoditas },
            data: {
                jumlah: {
                    decrement: produksi.jumlah
                }
            }
        });
    }

    const deleted = await prisma.produksi.delete({ where: { id } });
    return deleted;
}
