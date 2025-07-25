import prisma from "../config/prisma";

export async function getAllJenisService() {
    const jenis = await prisma.jenis.findMany({
        where: { isDeleted: false },
    });
    return jenis;
}

export async function createJenisService(name: string) {
    const newJenis = await prisma.jenis.create({
        data: { name }
    })

    return newJenis
}

export async function updateJenisService(id: number, name: string) {
    const updatedJenis = await prisma.jenis.update({ where: { id }, data: { name } })
    return updatedJenis
}

export async function deleteJenisService(id: number) {
    const deletedJenis = await prisma.jenis.update({
        where: { id },
        data: { isDeleted: true },
    });
    return deletedJenis;
}
