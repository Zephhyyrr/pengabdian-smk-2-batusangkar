import { Barang, TransaksiBarang, Komoditas, Penjualan, Produksi } from "@/types";

export const getBarang = async (): Promise<Barang[]> => {
  const res = await fetch("/dummy_api/barang.json");
  if (!res.ok) throw new Error("Failed to fetch barang");
  const data = await res.json();
  return data;
};

export const getTransaksiBarang = async (): Promise<TransaksiBarang[]> => {
  const res = await fetch("/dummy_api/transaksi_barang.json");
  if (!res.ok) throw new Error("Failed to fetch transaksi barang");
  const data = await res.json();
  return data;
};

export const getKomoditas = async (): Promise<Komoditas[]> => {
  const res = await fetch("/dummy_api/komoditas.json");
  if (!res.ok) throw new Error("Failed to fetch komoditas");
  const data = await res.json();
  return data;
};

export const getPenjualan = async (): Promise<Penjualan[]> => {
  const res = await fetch("/dummy_api/penjualan.json");
  if (!res.ok) throw new Error("Failed to fetch penjualan");
  const data = await res.json();
  
  await new Promise(resolve => setTimeout(resolve, 2000));

  return data;
};

export const getProduksi = async (): Promise<Produksi[]> => {
  const res = await fetch("/dummy_api/produksi.json");
  if (!res.ok) throw new Error("Failed to fetch produksi");
  const data = await res.json();
  
  await new Promise(resolve => setTimeout(resolve, 2000));

  return data;
};

export const createPenjualan = async (data: Partial<Penjualan>): Promise<Penjualan> => {
  // Simulasi POST request dengan mock object
  const mockPenjualan: Penjualan = {
    id: Math.floor(Math.random() * 1000) + 1,
    id_komodity: data.id_komodity || 1,
    komodity: {
      id: data.id_komodity || 1,
      id_jenis: 1,
      jenis: {
        id: 1,
        name: "Pangan",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        komoditas: [],
      },
      nama: "Beras Premium",
      deskripsi: "Beras kualitas tinggi",
      foto: "/images/beras.jpg",
      satuan: "kg",
      jumlah: 200,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    jumlah_terjual: data.jumlah_terjual || 0,
    id_produksi: data.id_produksi || 1,
    produksi: {
      id: data.id_produksi || 1,
      id_asal: 1,
      kode_produksi: "PROD001",
      ukuran: "50kg",
      kualitas: "Premium",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      asal_produksi: {
        id: 1,
        nama: "Pabrik A",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    },
    keterangan: data.keterangan || "Penjualan baru",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await new Promise(resolve => setTimeout(resolve, 2000));

  return mockPenjualan;
};
