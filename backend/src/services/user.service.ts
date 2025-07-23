import prisma from "../config/prisma";
import { AppError } from "../errors/api_errors";
import { RoleUser } from "@prisma/client";

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

export async function updateUserService(
    id: number,
    email: string,
    nama: string,
    role: string,
    password?: string
) {
    const parsedRole = role as RoleUser;

    if (!Object.values(RoleUser).includes(parsedRole)) {
        throw new Error("Role tidak valid.");
    }

    const data: {
        email: string;
        nama: string;
        role: RoleUser;
        password?: string;
    } = {
        email,
        nama,
        role: parsedRole,
    };

    if (password) {
        data.password = password;
    }

    const updated = await prisma.user.update({
        where: { id },
        data,
    });

    return updated;
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