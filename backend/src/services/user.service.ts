import prisma from "../config/prisma";
import { AppError } from "../errors/api_errors";

export async function getAllUserService() {
    const users = await prisma.user.findMany()
    return users
}

export async function addUserService(email: string, nama: string, password: string, role: any) {
    const newUser = await prisma.user.create({
        data: { email, nama, password, role }
    })

    return newUser
}

export async function updateUserService(id: number, email: string, nama: string, password: string, role: any) {
    const updated = await prisma.user.update({
        where: { id },
        data: { email, nama, password, role }
    })

    return updated
}

export async function deleteUserService(id: number) {
    await findUserById(id)
    const deleted = await prisma.user.delete({ where: { id } })

    return deleted
}

const findUserById = async (id: number) => {
    const user = await prisma.user.findUnique({ where: { id } })
    if (!user) throw new AppError(`User dengan id: ${id}, tidak tersedia.`)

    return user
}

export async function existsEmail(email: string, ignoreId?: number) {
    const whereClause: any = { email }

    if (ignoreId) { whereClause.id = { not: ignoreId } }

    const existtingEmail = await prisma.user.findFirst({
        where: whereClause
    })

    return existtingEmail
}