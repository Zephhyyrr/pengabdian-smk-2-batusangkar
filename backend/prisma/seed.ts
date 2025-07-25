import { PrismaClient } from '@prisma/client';
import { hashing } from '../src/utils/bcrypt';

const prisma = new PrismaClient();

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
            nama: 'Guru Pertanian',
            email: 'guru@gmail.com',
            password: (await hashing("Password123"))!,
            role: "guru"
        },
    });
    
    const kepsek = await prisma.user.create({
        data: {
            nama: 'Kepala Sekolah',
            email: 'kepsek@gmail.com',
            password: (await hashing("Password123"))!,
            role: "kepsek"
        },
    });
    
    const siswa1 = await prisma.user.create({
        data: {
            nama: 'Ucok Siswa',
            email: 'ucok@gmail.com',
            password: (await hashing("123123123"))!,
            role: "siswa"
        },
    });
    
    const siswa2 = await prisma.user.create({
        data: {
            nama: 'Siti Aminah',
            email: 'siti@gmail.com',
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
    
    const jenisRempah = await prisma.jenis.create({
        data: { name: 'Rempah-rempah' }
    });
    
    const jenisUmbi = await prisma.jenis.create({
        data: { name: 'Umbi-umbian' }
    });
    
    console.log('Jenis seeded successfully!');

    // 3. Seed AsalProduksi
    const asalKebunSekolah = await prisma.asalProduksi.create({
        data: { nama: 'Kebun Sekolah' }
    });
    
    const asalSupplier = await prisma.asalProduksi.create({
        data: { nama: 'Supplier Lokal' }
    });
    
    const asalKebunSiswa = await prisma.asalProduksi.create({
        data: { nama: 'Kebun Siswa' }
    });
    
    const asalKemitraan = await prisma.asalProduksi.create({
        data: { nama: 'Kemitraan Petani' }
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
    
    const komoditasBayam = await prisma.komoditas.create({
        data: {
            id_jenis: jenisSayuran.id,
            nama: 'Bayam',
            deskripsi: 'Sayuran hijau kaya zat besi.',
            foto: 'bayam.jpg',
            satuan: 'ikat',
            jumlah: 80
        }
    });
    
    const komoditasSawi = await prisma.komoditas.create({
        data: {
            id_jenis: jenisSayuran.id,
            nama: 'Sawi Hijau',
            deskripsi: 'Sayuran segar untuk sup dan tumisan.',
            foto: 'sawi.jpg',
            satuan: 'kg',
            jumlah: 60
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
    
    const komoditasJeruk = await prisma.komoditas.create({
        data: {
            id_jenis: jenisBuah.id,
            nama: 'Jeruk Manis',
            deskripsi: 'Jeruk segar kaya vitamin C.',
            foto: 'jeruk.jpg',
            satuan: 'kg',
            jumlah: 40
        }
    });
    
    const komoditasCabe = await prisma.komoditas.create({
        data: {
            id_jenis: jenisRempah.id,
            nama: 'Cabe Rawit',
            deskripsi: 'Cabe pedas untuk bumbu masakan.',
            foto: 'cabe.jpg',
            satuan: 'kg',
            jumlah: 15
        }
    });
    
    const komoditasJahe = await prisma.komoditas.create({
        data: {
            id_jenis: jenisRempah.id,
            nama: 'Jahe Merah',
            deskripsi: 'Jahe berkualitas tinggi untuk obat herbal.',
            foto: 'jahe.jpg',
            satuan: 'kg',
            jumlah: 25
        }
    });
    
    const komoditasSingkong = await prisma.komoditas.create({
        data: {
            id_jenis: jenisUmbi.id,
            nama: 'Singkong',
            deskripsi: 'Umbi singkong segar untuk makanan pokok.',
            foto: 'singkong.jpg',
            satuan: 'kg',
            jumlah: 120
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
            harga_persatuan: 3000
        }
    });
    
    const produksiBayam = await prisma.produksi.create({
        data: {
            id_asal: asalKebunSekolah.id,
            kode_produksi: 'PROD-BAYAM-001',
            ukuran: 'Sedang',
            kualitas: 'A',
            id_komoditas: komoditasBayam.id,
            jumlah: 80,
            harga_persatuan: 2500
        }
    });
    
    const produksiSawi = await prisma.produksi.create({
        data: {
            id_asal: asalKebunSiswa.id,
            kode_produksi: 'PROD-SAWI-001',
            ukuran: 'Besar',
            kualitas: 'B',
            id_komoditas: komoditasSawi.id,
            jumlah: 60,
            harga_persatuan: 4000
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
            harga_persatuan: 15000
        }
    });
    
    const produksiJeruk = await prisma.produksi.create({
        data: {
            id_asal: asalKemitraan.id,
            kode_produksi: 'PROD-JERUK-001',
            ukuran: 'Besar',
            kualitas: 'A',
            id_komoditas: komoditasJeruk.id,
            jumlah: 40,
            harga_persatuan: 12000
        }
    });
    
    const produksiCabe = await prisma.produksi.create({
        data: {
            id_asal: asalKebunSekolah.id,
            kode_produksi: 'PROD-CABE-001',
            ukuran: 'Kecil',
            kualitas: 'A',
            id_komoditas: komoditasCabe.id,
            jumlah: 15,
            harga_persatuan: 25000
        }
    });
    
    const produksiJahe = await prisma.produksi.create({
        data: {
            id_asal: asalKebunSiswa.id,
            kode_produksi: 'PROD-JAHE-001',
            ukuran: 'Sedang',
            kualitas: 'A',
            id_komoditas: komoditasJahe.id,
            jumlah: 25,
            harga_persatuan: 18000
        }
    });
    
    const produksiSingkong = await prisma.produksi.create({
        data: {
            id_asal: asalKemitraan.id,
            kode_produksi: 'PROD-SINGKONG-001',
            ukuran: 'Besar',
            kualitas: 'B',
            id_komoditas: komoditasSingkong.id,
            jumlah: 120,
            harga_persatuan: 5000
        }
    });
    
    console.log('Produksi seeded successfully!');

    // 6. Seed Penjualan
    await prisma.penjualan.create({
        data: {
            id_komodity: komoditasKangkung.id,
            id_produksi: produksiKangkung.id,
            jumlah_terjual: 10,
            total_harga: 30000,
            keterangan: 'Penjualan kangkung ke kantin sekolah.'
        }
    });
    
    await prisma.penjualan.create({
        data: {
            id_komodity: komoditasBayam.id,
            id_produksi: produksiBayam.id,
            jumlah_terjual: 15,
            total_harga: 37500,
            keterangan: 'Penjualan bayam untuk acara sekolah.'
        }
    });
    
    await prisma.penjualan.create({
        data: {
            id_komodity: komoditasMangga.id,
            id_produksi: produksiMangga.id,
            jumlah_terjual: 5,
            total_harga: 75000,
            keterangan: 'Penjualan mangga untuk acara perpisahan.'
        }
    });
    
    await prisma.penjualan.create({
        data: {
            id_komodity: komoditasJeruk.id,
            id_produksi: produksiJeruk.id,
            jumlah_terjual: 8,
            total_harga: 96000,
            keterangan: 'Penjualan jeruk untuk kantin sekolah.'
        }
    });
    
    await prisma.penjualan.create({
        data: {
            id_komodity: komoditasCabe.id,
            id_produksi: produksiCabe.id,
            jumlah_terjual: 2,
            total_harga: 50000,
            keterangan: 'Penjualan cabe rawit ke warung sekitar sekolah.'
        }
    });
    
    await prisma.penjualan.create({
        data: {
            id_komodity: komoditasSawi.id,
            id_produksi: produksiSawi.id,
            jumlah_terjual: 12,
            total_harga: 48000,
            keterangan: 'Penjualan sawi hijau ke pasar tradisional.'
        }
    });
    
    console.log('Penjualan seeded successfully!');

    // 7. Seed Barang
    const barangPupuk = await prisma.barang.create({
        data: {
            nama: 'Pupuk Kompos',
            satuan: 'karung'
        }
    });
    
    const barangBenih = await prisma.barang.create({
        data: {
            nama: 'Benih Kangkung',
            satuan: 'bungkus'
        }
    });
    
    const barangPestisida = await prisma.barang.create({
        data: {
            nama: 'Pestisida Organik',
            satuan: 'botol'
        }
    });
    
    const barangCangkul = await prisma.barang.create({
        data: {
            nama: 'Cangkul',
            satuan: 'buah'
        }
    });
    
    const barangSelang = await prisma.barang.create({
        data: {
            nama: 'Selang Air',
            satuan: 'meter'
        }
    });
    
    const barangSpreyer = await prisma.barang.create({
        data: {
            nama: 'Alat Spreyer',
            satuan: 'buah'
        }
    });
    
    console.log('Barang seeded successfully!');

    // 8. Seed TransaksiBarang
    // Transaksi masuk barang
    await prisma.transaksiBarang.create({
        data: {
            id_barang: barangPupuk.id,
            tanggal: new Date('2024-01-15'),
            masuk: 10,
            keluar: 0,
            keterangan: 'Pembelian pupuk kompos untuk kebun sekolah'
        }
    });
    
    await prisma.transaksiBarang.create({
        data: {
            id_barang: barangBenih.id,
            tanggal: new Date('2024-01-20'),
            masuk: 50,
            keluar: 0,
            keterangan: 'Pembelian benih kangkung untuk musim tanam baru'
        }
    });
    
    await prisma.transaksiBarang.create({
        data: {
            id_barang: barangPestisida.id,
            tanggal: new Date('2024-01-25'),
            masuk: 5,
            keluar: 0,
            keterangan: 'Pembelian pestisida organik untuk pengendalian hama'
        }
    });
    
    await prisma.transaksiBarang.create({
        data: {
            id_barang: barangCangkul.id,
            tanggal: new Date('2024-02-01'),
            masuk: 8,
            keluar: 0,
            keterangan: 'Pembelian cangkul untuk kegiatan praktik siswa'
        }
    });
    
    await prisma.transaksiBarang.create({
        data: {
            id_barang: barangSelang.id,
            tanggal: new Date('2024-02-05'),
            masuk: 100,
            keluar: 0,
            keterangan: 'Pembelian selang air untuk sistem irigasi'
        }
    });
    
    // Transaksi keluar barang
    await prisma.transaksiBarang.create({
        data: {
            id_barang: barangPupuk.id,
            tanggal: new Date('2024-02-10'),
            masuk: 0,
            keluar: 3,
            keterangan: 'Penggunaan pupuk kompos untuk pemupukan tanaman kangkung'
        }
    });
    
    await prisma.transaksiBarang.create({
        data: {
            id_barang: barangBenih.id,
            tanggal: new Date('2024-02-12'),
            masuk: 0,
            keluar: 15,
            keterangan: 'Penggunaan benih kangkung untuk penanaman di lahan A'
        }
    });
    
    await prisma.transaksiBarang.create({
        data: {
            id_barang: barangPestisida.id,
            tanggal: new Date('2024-02-15'),
            masuk: 0,
            keluar: 1,
            keterangan: 'Penggunaan pestisida organik untuk pengendalian kutu daun'
        }
    });
    
    await prisma.transaksiBarang.create({
        data: {
            id_barang: barangSelang.id,
            tanggal: new Date('2024-02-18'),
            masuk: 0,
            keluar: 25,
            keterangan: 'Penggunaan selang untuk instalasi sistem irigasi lahan B'
        }
    });
    
    // Transaksi masuk tambahan
    await prisma.transaksiBarang.create({
        data: {
            id_barang: barangSpreyer.id,
            tanggal: new Date('2024-02-20'),
            masuk: 3,
            keluar: 0,
            keterangan: 'Pembelian alat spreyer untuk aplikasi pestisida'
        }
    });
    
    await prisma.transaksiBarang.create({
        data: {
            id_barang: barangPupuk.id,
            tanggal: new Date('2024-03-01'),
            masuk: 5,
            keluar: 0,
            keterangan: 'Tambahan stok pupuk kompos untuk periode musim kemarau'
        }
    });
    
    await prisma.transaksiBarang.create({
        data: {
            id_barang: barangBenih.id,
            tanggal: new Date('2024-03-05'),
            masuk: 0,
            keluar: 20,
            keterangan: 'Penggunaan benih untuk program praktik siswa kelas XI'
        }
    });
    
    await prisma.transaksiBarang.create({
        data: {
            id_barang: barangSpreyer.id,
            tanggal: new Date('2024-03-10'),
            masuk: 0,
            keluar: 1,
            keterangan: 'Peminjaman spreyer untuk praktik siswa'
        }
    });
    
    console.log('TransaksiBarang seeded successfully!');

    console.log('\n=== SEEDING COMPLETED SUCCESSFULLY ===');
    console.log('✅ Users:', 5);
    console.log('✅ Jenis:', 4);
    console.log('✅ Asal Produksi:', 4);
    console.log('✅ Komoditas:', 8);
    console.log('✅ Produksi:', 8);
    console.log('✅ Penjualan:', 6);
    console.log('✅ Barang:', 6);
    console.log('✅ Transaksi Barang:', 14);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });