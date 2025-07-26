import { PrismaClient } from '@prisma/client';
import { hashing } from '../src/utils/bcrypt';

const prisma = new PrismaClient();

// Helper function to generate random date within a range
function randomDate(start: Date, end: Date): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Helper function to get random element from array
function randomChoice<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

// Helper function to generate random number between min and max
function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function main() {
    // Clear existing data to avoid conflicts
    await prisma.transaksiBarang.deleteMany({});
    await prisma.barang.deleteMany({});
    await prisma.penjualan.deleteMany({});
    await prisma.produksi.deleteMany({});
    await prisma.komoditas.deleteMany({});
    await prisma.asalProduksi.deleteMany({});
    await prisma.jenis.deleteMany({});
    await prisma.user.deleteMany({});

    // 1. Seed User
    const users = await prisma.user.createMany({
        data: [
            {
                nama: 'Admin',
                email: 'admin@gmail.com',
                password: (await hashing("Password123"))!,
                role: "admin"
            },
            {
                nama: 'Guru',
                email: 'guru@gmail.com',
                password: (await hashing("Password123"))!,
                role: "guru"
            },
            {
                nama: 'Kepala Sekolah',
                email: 'kepsek@gmail.com',
                password: (await hashing("Password123"))!,
                role: "kepsek"
            },
            {
                nama: 'Ucok',
                email: 'ucok@gmail.com',
                password: (await hashing("123123123"))!,
                role: "siswa"
            },
            {
                nama: 'Siti',
                email: 'siti@gmail.com',
                password: (await hashing("123123123"))!,
                role: "siswa"
            }
        ]
    });

    console.log('User seeded successfully!');

    // 2. Seed Jenis (only Melon)
    const jenisMelon = await prisma.jenis.create({
        data: { name: 'Melon' }
    });

    console.log('Jenis seeded successfully!');

    // 3. Seed AsalProduksi (Greenhouse format)
    const asalProduksiData = [
        { nama: 'Greenhouse 1' },
        { nama: 'Greenhouse 2' },
        { nama: 'Greenhouse 3' },
        { nama: 'Greenhouse 4' },
        { nama: 'Greenhouse 5' }
    ];

    await prisma.asalProduksi.createMany({ data: asalProduksiData });
    const asalProduksiList = await prisma.asalProduksi.findMany();

    console.log('Asal Produksi seeded successfully!');

    // 4. Seed Komoditas (only Melon varieties) - jumlah set to 0 initially
    const komoditasData = [
        {
            id_jenis: jenisMelon.id,
            nama: "Greenigal",
            deskripsi: "Melon Greenigal memiliki Brix 12-15. Secara visual, netnya berwarna putih dengan persentase 90%, tangkai berbentuk huruf T sepanjang 20cm dari ujung ke ujung, buahnya keras merata di seluruh bagian, tidak ada spot gundul, dan tidak ada net berwarna kecoklatan/hitam. Ukurannya berkisar 800gr hingga 2000gr. Bentuknya bulat simetris dengan tekstur sedikit crunchy dan biji yang masih menempel sempurna tidak rontok.",
            foto: "melon_greenigal.jpg",
            satuan: "Kg",
            jumlah: 0
        },
        {
            id_jenis: jenisMelon.id,
            nama: "Dalmatian",
            deskripsi: "Melon Dalmatian memiliki Brix 12-15. Secara visual, permukaannya halus, terkadang memiliki net dan kering/berwarna putih. Tangkainya berbentuk huruf T sepanjang 20cm dari ujung ke ujung. Memiliki bintik hijau merata, tidak ada retakan basah, buahnya keras merata, dan ukurannya berkisar 800gr hingga 2000gr. Bentuknya bulat simetris dengan tekstur padat dan biji yang masih menempel sempurna tidak rontok.",
            foto: "melon_dalmatian.jpg",
            satuan: "Kg",
            jumlah: 0
        },
        {
            id_jenis: jenisMelon.id,
            nama: "Greenie Sweet",
            deskripsi: "Melon Greenie Sweet memiliki Brix 12-15. Secara visual, permukaannya halus/memiliki net tipis dan kering. Tangkainya berbentuk huruf T sepanjang 20cm dari ujung ke ujung. Tidak ada spot hijau, tidak ada retakan basah, buahnya keras merata, dan ukurannya berkisar 800gr hingga 2000gr. Bentuknya bulat simetris dengan tekstur padat dan biji yang masih menempel sempurna tidak rontok.",
            foto: "melon_greeniesweet.jpg",
            satuan: "Kg",
            jumlah: 0
        },
        {
            id_jenis: jenisMelon.id,
            nama: "Aruni",
            deskripsi: "Melon Aruni memiliki Brix 12-15. Secara visual, permukaannya halus/memiliki net tipis dan kering. Tangkainya berbentuk huruf T sepanjang 20cm dari ujung ke ujung. Tidak ada spot hijau, tidak ada retakan basah, buahnya keras merata, dan ukurannya berkisar 800gr hingga 2000gr. Bentuknya oval/bulat dan simetris dengan tekstur padat dan biji yang masih menempel sempurna tidak rontok.",
            foto: "melon_aruni.jpg",
            satuan: "Kg",
            jumlah: 0
        },
        {
            id_jenis: jenisMelon.id,
            nama: "Elysia",
            deskripsi: "Melon Elysia memiliki Brix 13-15. Secara visual, net putihnya merata di atas 70%. Tangkainya berbentuk huruf T dengan panjang total 20cm dari ujung ke ujung. Tidak ada net retak basah (berwarna cokelat/hitam). Buahnya keras merata dan ukurannya berkisar 800gr hingga 2000gr. Bentuknya lonjong simetris dengan tekstur crunchy dan biji yang masih menempel sempurna tidak rontok.",
            foto: "melon_elysia.jpg",
            satuan: "Kg",
            jumlah: 0
        },
        {
            id_jenis: jenisMelon.id,
            nama: "Midori",
            deskripsi: "Melon Midori memiliki Brix 13-15. Secara visual, net putihnya merata di atas 70%. Tangkainya berbentuk huruf T sepanjang 20cm dari ujung ke ujung. Tidak ada net retak basah (berwarna cokelat/hitam). Buahnya keras merata dan ukurannya berkisar 800gr hingga 2000gr. Bentuknya lonjong simetris dengan tekstur crunchy dan biji yang masih menempel sempurna tidak rontok.",
            foto: "melon_midori.jpg",
            satuan: "Kg",
            jumlah: 0
        },
        {
            id_jenis: jenisMelon.id,
            nama: "Sunray",
            deskripsi: "Melon Sunray memiliki Brix 13-15. Secara visual, warnanya hijau gelap dengan semburat kuning. Tangkainya berbentuk huruf T sepanjang 20cm dari ujung ke ujung. Terkadang memiliki net berwarna putih dan tidak ada net retak basah (berwarna cokelat/hitam). Buahnya keras merata dan ukurannya berkisar 800gr hingga 2000gr. Bentuknya lonjong simetris dengan tekstur crunchy dan biji yang masih menempel sempurna tidak rontok.",
            foto: "melon_sunray.jpg",
            satuan: "Kg",
            jumlah: 0
        }
    ];

    await prisma.komoditas.createMany({ data: komoditasData });
    const komoditasList = await prisma.komoditas.findMany();

    console.log('Komoditas seeded successfully!');

    // 5. Seed Produksi with random data (only for melon)
    const produksiData = [];
    const kualitasOptions = ['A', 'B', 'Premium'];
    const ukuranOptions = ['Kecil', 'Sedang', 'Besar'];

    // Track total production per commodity for updating komoditas.jumlah
    const komoditasProductionTotals: { [key: number]: number } = {};

    for (let i = 0; i < komoditasList.length; i++) {
        const komoditas = komoditasList[i];
        const basePrice = randomInt(20000, 40000); // Melon price range

        // Initialize total for this commodity
        komoditasProductionTotals[komoditas.id] = 0;

        // Create 3-4 productions per commodity from different greenhouses
        const prodCount = randomInt(3, 4);
        for (let j = 0; j < prodCount; j++) {
            const jumlahProduksi = randomInt(50, 200);
            komoditasProductionTotals[komoditas.id] += jumlahProduksi;

            produksiData.push({
                id_asal: randomChoice(asalProduksiList).id,
                kode_produksi: `PROD-${komoditas.nama.replace(/\s+/g, '').toUpperCase()}-${String(j + 1).padStart(3, '0')}`,
                ukuran: randomChoice(ukuranOptions),
                kualitas: randomChoice(kualitasOptions),
                id_komoditas: komoditas.id,
                jumlah: jumlahProduksi,
                harga_persatuan: basePrice + randomInt(-5000, 10000)
            });
        }
    }

    await prisma.produksi.createMany({ data: produksiData });
    const produksiList = await prisma.produksi.findMany({ include: { komoditas: true } });

    console.log('Produksi seeded successfully!');

    // 6. Update Komoditas jumlah based on total production
    for (const komoditasId in komoditasProductionTotals) {
        await prisma.komoditas.update({
            where: { id: parseInt(komoditasId) },
            data: { jumlah: komoditasProductionTotals[parseInt(komoditasId)] }
        });
    }

    console.log('Komoditas quantities updated based on production data!');

    // 7. Seed Penjualan with multiple transactions on same dates
    const penjualanData = [];
    const keteranganTemplates = [
        'Penjualan ke kantin sekolah',
        'Penjualan untuk acara sekolah',
        'Penjualan ke pasar tradisional',
        'Penjualan ke supplier lokal',
        'Penjualan langsung ke konsumen',
        'Penjualan ke restoran sekitar',
        'Penjualan untuk catering acara',
        'Penjualan ke toko buah',
        'Penjualan ke warung sekitar',
        'Penjualan untuk festival sekolah'
    ];

    const startDate = new Date('2025-01-01');
    const endDate = new Date('2025-07-30');

    // Track total sold per commodity to update komoditas.jumlah
    const komoditasSoldTotals: { [key: number]: number } = {};

    // Initialize sold totals
    komoditasList.forEach(komoditas => {
        komoditasSoldTotals[komoditas.id] = 0;
    });

    // Create 40-60 sales transactions
    for (let i = 0; i < randomInt(40, 60); i++) {
        const produksi = randomChoice(produksiList);
        const tanggalJual = randomDate(startDate, endDate);
        const jumlahTerjual = randomInt(5, Math.min(50, produksi.jumlah));

        // Track sold quantity
        komoditasSoldTotals[produksi.id_komoditas!] += jumlahTerjual;

        penjualanData.push({
            id_komodity: produksi.id_komoditas!,
            id_produksi: produksi.id,
            jumlah_terjual: jumlahTerjual,
            total_harga: jumlahTerjual * produksi.harga_persatuan,
            keterangan: `${randomChoice(keteranganTemplates)} - ${produksi.komoditas?.nama}`,
            createdAt: tanggalJual,
            updatedAt: tanggalJual
        });
    }

    // Sort by date to create some same-day transactions
    penjualanData.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

    // Artificially create some same-day transactions
    for (let i = 0; i < 15; i++) {
        const baseDate = randomDate(startDate, endDate);
        const sameDayCount = randomInt(2, 4);

        for (let j = 0; j < sameDayCount; j++) {
            const produksi = randomChoice(produksiList);
            const jumlahTerjual = randomInt(3, 20);

            // Track sold quantity
            komoditasSoldTotals[produksi.id_komoditas!] += jumlahTerjual;

            penjualanData.push({
                id_komodity: produksi.id_komoditas!,
                id_produksi: produksi.id,
                jumlah_terjual: jumlahTerjual,
                total_harga: jumlahTerjual * produksi.harga_persatuan,
                keterangan: `Transaksi ${j + 1} - ${randomChoice(keteranganTemplates)} - ${produksi.komoditas?.nama}`,
                createdAt: baseDate,
                updatedAt: baseDate
            });
        }
    }

    await prisma.penjualan.createMany({ data: penjualanData });

    console.log('Penjualan seeded successfully!');

    // 8. Update Komoditas jumlah after sales (subtract sold quantities)
    for (const komoditasId in komoditasSoldTotals) {
        const currentKomoditas = await prisma.komoditas.findUnique({
            where: { id: parseInt(komoditasId) }
        });

        if (currentKomoditas) {
            const remainingQuantity = Math.max(0, currentKomoditas.jumlah - komoditasSoldTotals[parseInt(komoditasId)]);
            await prisma.komoditas.update({
                where: { id: parseInt(komoditasId) },
                data: { jumlah: remainingQuantity }
            });
        }
    }

    console.log('Komoditas quantities updated after sales!');

    // 9. Seed Barang (only melon-related items)
    const barangData = [
        { nama: 'Pupuk Kompos Khusus Melon', satuan: 'karung' },
        { nama: 'Benih Melon Hibrida', satuan: 'bungkus' },
        { nama: 'Pupuk NPK 16-16-16', satuan: 'karung' },
        { nama: 'Pupuk Organik Cair', satuan: 'liter' },
        { nama: 'Pestisida Organik', satuan: 'botol' },
        { nama: 'Fungisida Sistemik', satuan: 'botol' },
        { nama: 'Mulsa Plastik Hitam', satuan: 'roll' },
        { nama: 'Mulsa Plastik Silver', satuan: 'roll' },
        { nama: 'Selang Irigasi Tetes', satuan: 'meter' },
        { nama: 'Sprayer Manual', satuan: 'buah' },
        { nama: 'Jaring Peneduh 70%', satuan: 'meter' },
        { nama: 'Ajir Bambu', satuan: 'batang' }
    ];

    await prisma.barang.createMany({ data: barangData });
    const barangList = await prisma.barang.findMany();

    console.log('Barang seeded successfully!');

    // 10. Seed TransaksiBarang with multiple transactions on same dates
    const transaksiBarangData = [];
    const keteranganBarangTemplates = [
        'Pembelian untuk stok bulanan',
        'Penggunaan untuk produksi melon',
        'Pembelian darurat',
        'Penggunaan untuk maintenance greenhouse',
        'Restocking inventory',
        'Penggunaan untuk eksperimen siswa',
        'Pembelian untuk ekspansi greenhouse',
        'Penggunaan rutin harian',
        'Pembelian untuk backup',
        'Penggunaan untuk pelatihan'
    ];

    // Generate transactions from Jan 2024 to Nov 2024
    for (let month = 0; month < 11; month++) {
        const monthStart = new Date(2024, month, 1);
        const monthEnd = new Date(2024, month + 1, 0);

        // Create 20-30 transactions per month
        for (let i = 0; i < randomInt(20, 30); i++) {
            const barang = randomChoice(barangList);
            const tanggalTransaksi = randomDate(monthStart, monthEnd);
            const isMasuk = Math.random() > 0.4; // 60% chance masuk, 40% keluar

            transaksiBarangData.push({
                id_barang: barang.id,
                tanggal: tanggalTransaksi,
                masuk: isMasuk ? randomInt(5, 50) : 0,
                keluar: isMasuk ? 0 : randomInt(1, 20),
                keterangan: `${randomChoice(keteranganBarangTemplates)} - ${barang.nama}`
            });
        }
    }

    // Create specific same-day transactions
    for (let i = 0; i < 25; i++) {
        const baseDate = randomDate(startDate, endDate);
        const sameDayCount = randomInt(3, 6);

        for (let j = 0; j < sameDayCount; j++) {
            const barang = randomChoice(barangList);
            const isMasuk = Math.random() > 0.5;

            transaksiBarangData.push({
                id_barang: barang.id,
                tanggal: baseDate,
                masuk: isMasuk ? randomInt(10, 100) : 0,
                keluar: isMasuk ? 0 : randomInt(5, 30),
                keterangan: `Batch ${j + 1} - ${randomChoice(keteranganBarangTemplates)} - ${barang.nama}`
            });
        }
    }

    await prisma.transaksiBarang.createMany({ data: transaksiBarangData });

    console.log('TransaksiBarang seeded successfully!');

    // Get final counts and show updated quantities
    const finalCounts = {
        users: await prisma.user.count(),
        jenis: await prisma.jenis.count(),
        asalProduksi: await prisma.asalProduksi.count(),
        komoditas: await prisma.komoditas.count(),
        produksi: await prisma.produksi.count(),
        penjualan: await prisma.penjualan.count(),
        barang: await prisma.barang.count(),
        transaksiBarang: await prisma.transaksiBarang.count()
    };

    // Show final komoditas quantities
    const finalKomoditasQuantities = await prisma.komoditas.findMany({
        select: { id: true, nama: true, jumlah: true }
    });

    console.log('\n=== SEEDING COMPLETED SUCCESSFULLY ===');
    console.log('✅ Users:', finalCounts.users);
    console.log('✅ Jenis:', finalCounts.jenis, '(Melon only)');
    console.log('✅ Asal Produksi:', finalCounts.asalProduksi, '(5 Greenhouses)');
    console.log('✅ Komoditas:', finalCounts.komoditas, '(7 Melon varieties)');
    console.log('✅ Produksi:', finalCounts.produksi, '(Multiple productions per variety)');
    console.log('✅ Penjualan:', finalCounts.penjualan, '(With same-day transactions)');
    console.log('✅ Barang:', finalCounts.barang, '(Melon farming supplies)');
    console.log('✅ Transaksi Barang:', finalCounts.transaksiBarang, '(With same-day transactions)');

    console.log('\n📦 Final Komoditas Quantities (Production - Sales):');
    finalKomoditasQuantities.forEach(komoditas => {
        console.log(`${komoditas.nama}: ${komoditas.jumlah} Kg`);
    });

    // Show some same-day transaction examples (fixed table names)
    const sameDayPenjualan = await prisma.$queryRaw`
        SELECT DATE("createdAt") as tanggal, COUNT(*) as jumlah_transaksi
        FROM "Penjualan" 
        GROUP BY DATE("createdAt") 
        HAVING COUNT(*) > 1 
        ORDER BY jumlah_transaksi DESC 
        LIMIT 5
    `;

    const sameDayTransaksiBarang = await prisma.$queryRaw`
        SELECT DATE(tanggal) as tanggal, COUNT(*) as jumlah_transaksi
        FROM "TransaksiBarang" 
        GROUP BY DATE(tanggal) 
        HAVING COUNT(*) > 1 
        ORDER BY jumlah_transaksi DESC 
        LIMIT 5
    `;

    console.log('\n📊 Same-day transaction examples:');
    console.log('Penjualan:', sameDayPenjualan);
    console.log('TransaksiBarang:', sameDayTransaksiBarang);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
