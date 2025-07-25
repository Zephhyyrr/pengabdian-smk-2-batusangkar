import { PrismaClient } from '@prisma/client';
import { hashing } from '../src/utils/bcrypt';

const prisma = new PrismaClient();

async function main() {
    // Clear existing data to avoid conflicts
    await prisma.penjualan.deleteMany({});
    await prisma.produksi.deleteMany({});
    await prisma.komoditas.deleteMany({});
    await prisma.asalProduksi.deleteMany({});
    await prisma.jenis.deleteMany({});
    await prisma.user.deleteMany({});

    // 1. Seed User
    const admin = await prisma.user.create({
        data: {
            nama: 'Admin',
            email: 'admin@gmail.com',
            password: (await hashing("Password123"))!,
            role: "admin"
        },
    });
    const guru = await prisma.user.create({
        data: {
            nama: 'Guru',
            email: 'guru@gmail.com',
            password: (await hashing("Password123"))!,
            role: "guru"
        },
    });
    const siswa = await prisma.user.create({
        data: {
            nama: 'Ucok',
            email: 'ucok@gmail.com',
            password: (await hashing("123123123"))!,
            role: "siswa"
        },
    });
    console.log('User seeded successfully!');

    // 2. Seed Jenis
    const jenisSayuran = await prisma.jenis.create({
        data: { name: 'Sayuran' }
    });
    const jenisBuah = await prisma.jenis.create({
        data: { name: 'Buah-buahan' }
    });
    console.log('Jenis seeded successfully!');

    // 3. Seed AsalProduksi
    const asalKebunSekolah = await prisma.asalProduksi.create({
        data: { nama: 'Kebun Sekolah' }
    });
    const asalSupplier = await prisma.asalProduksi.create({
        data: { nama: 'Supplier Lokal' }
    });
    console.log('Asal Produksi seeded successfully!');

    // 4. Seed Komoditas
    const komoditasKangkung = await prisma.komoditas.create({
        data: {
            id_jenis: jenisSayuran.id,
            nama: 'Kangkung',
            deskripsi: 'Sayuran hijau segar kaya serat.',
            foto: 'kangkung.jpg',
            satuan: 'ikat',
            jumlah: 100
        }
    });
    const komoditasMangga = await prisma.komoditas.create({
        data: {
            id_jenis: jenisBuah.id,
            nama: 'Mangga Harum Manis',
            deskripsi: 'Buah mangga manis dan harum.',
            foto: 'mangga.jpg',
            satuan: 'kg',
            jumlah: 50
        }
    });
    console.log('Komoditas seeded successfully!');

    // 5. Seed Produksi
    const produksiKangkung = await prisma.produksi.create({
        data: {
            id_asal: asalKebunSekolah.id,
            kode_produksi: 'PROD-KANGKUNG-001',
            ukuran: 'Besar',
            kualitas: 'A',
            id_komoditas: komoditasKangkung.id,
            jumlah: 100,
        }
    });
    const produksiMangga = await prisma.produksi.create({
        data: {
            id_asal: asalSupplier.id,
            kode_produksi: 'PROD-MANGGA-001',
            ukuran: 'Sedang',
            kualitas: 'B',
            id_komoditas: komoditasMangga.id,
            jumlah: 50,
        }
    });
    console.log('Produksi seeded successfully!');

    // 6. Seed Penjualan
    await prisma.penjualan.create({
        data: {
            id_komodity: komoditasKangkung.id,
            id_produksi: produksiKangkung.id,
            jumlah_terjual: 10,
            keterangan: 'Penjualan kangkung ke kantin sekolah.'
        }
    });
    await prisma.penjualan.create({
        data: {
            id_komodity: komoditasMangga.id,
            id_produksi: produksiMangga.id,
            jumlah_terjual: 5,
            keterangan: 'Penjualan mangga untuk acara sekolah.'
        }
    });
    console.log('Penjualan seeded successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });