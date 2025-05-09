import { PrismaClient } from '@prisma/client';
import { hashing } from '../src/utils/bcrypt';

const prisma = new PrismaClient();

async function main() {
    // Seed a super admin user
    await prisma.user.create({
        data: {
            nama: 'Super Admib',
            email: 'superadmin@gmail.com',
            password: (await hashing("Password123"))!,
            role: "super_admin"
        },
    });

    console.log('User seeded successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });