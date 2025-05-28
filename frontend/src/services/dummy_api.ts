import { Barang, TransaksiBarang, Komoditas, Penjualan } from '@/types';

export const getBarang = async (): Promise<Barang[]> => {
  const res = await fetch('/dummy_api/barang.json');
  if (!res.ok) throw new Error('Failed to fetch barang');
  const data = await res.json();
  return data;
};

export const getTransaksiBarang = async (): Promise<TransaksiBarang[]> => {
  const res = await fetch('/dummy_api/transaksi_barang.json');
  if (!res.ok) throw new Error('Failed to fetch transaksi barang');
  const data = await res.json();
  return data;
};

export const getKomoditas = async (): Promise<Komoditas[]> => {
  const res = await fetch('/dummy_api/komoditas.json');
  if (!res.ok) throw new Error('Failed to fetch komoditas');
  const data = await res.json();
  return data;
};

export const getPenjualan = async (): Promise<Penjualan[]> => {
  const res = await fetch('/dummy_api/penjualan.json');
  if (!res.ok) throw new Error('Failed to fetch penjualan');
  const data = await res.json();
  return data;
};

export const createPenjualan = async (data: Partial<Penjualan>): Promise<Penjualan> => {
  // Simulate POST request by returning a mock Penjualan object
  const mockPenjualan: Penjualan = {
    id: Math.floor(Math.random() * 1000) + 1, // Random ID for demo
    id_komodity: data.id_komodity || 1,
    komodity: {
      id: data.id_komodity || 1,
      id_jenis: 1,
      jenis: {
        id: 1,
        name: 'Pangan',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        komoditas: [],
      },
      nama: 'Beras Premium',
      deskripsi: 'Beras kualitas tinggi',
      foto: '/images/beras.jpg',
      satuan: 'kg',
      jumlah: 200,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    ukuran: data.ukuran || '5kg',
    jumlah_terjual: data.jumlah_terjual || 0,
    kualitas: data.kualitas || 'Premium',
    id_produksi: data.id_produksi || 1,
    produksi: {
      id: data.id_produksi || 1,
      id_asal: 1,
      kode_produksi: 'PROD001',
      asal_produksi: {
        id: 1,
        nama: 'Jawa Tengah',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    keterangan: data.keterangan || 'Penjualan baru',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  return mockPenjualan;
};