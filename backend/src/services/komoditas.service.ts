import prisma from "../config/prisma";
import { AppError } from "../errors/api_errors";

export async function getAllKomoditasService() {
    const komoditas = await prisma.komoditas.findMany({
        where: { isDeleted: false },
        include: { jenis: { select: { name: true } } }
    });
    return komoditas;
}

export async function getKomoditasByIdService(id: number) {
    const komoditas = await prisma.komoditas.findFirst({
        where: { id, isDeleted: false }
    });

    if (!komoditas) throw new AppError(`Komoditas dengan id: ${id}, tidak tersedia.`);

    return komoditas;
}

export async function createdKomoditasService(
    id_jenis: number,
    nama: string,
    deskripsi: string,
    foto: string,
    satuan: string,
    jumlah: number
) {
    const newKomoditas = await prisma.komoditas.create({
        data: {
            id_jenis,
            nama,
            deskripsi,
            foto,
            satuan,
            jumlah
        }
    });

    return newKomoditas;
}

export async function updateKomoditasService(
    id_komoditas: number,
    id_jenis: number | undefined,
    nama: string,
    deskripsi: string,
    foto: string,
    satuan: string
) {
    await getKomoditasByIdService(id_komoditas);

    const updatedKomoditas = await prisma.komoditas.update({
        where: { id: id_komoditas },
        data: {
            id_jenis,
            nama,
            deskripsi,
            foto,
            satuan
        }
    });

    return updatedKomoditas;
}

export async function deleteKomoditasService(id: number) {
    await getKomoditasByIdService(id);

    const softDeleted = await prisma.komoditas.update({
        where: { id },
        data: { isDeleted: true }
    });

    return softDeleted;
}
