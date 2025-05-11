export type RoleUser = "super_admin" | "admin" | "kepsek" | "siswa";

export interface User {
  id: number;
  nama: string;
  email: string;
  password: string;
  role: RoleUser;
  createdAt: string;
  updatedAt: string;
}

export interface Jenis {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Komoditas {
  id: number;
  id_jenis: number;
  nama: string;
  deskripsi: string;
  foto: string;
  satuan: string;
  jumlah: number;
  createdAt: string;
  updatedAt: string;
}

export interface AsalProduksi {
  id: number;
  nama: string;
  createdAt: string;
  updatedAt: string;
}

export interface Produksi {
  id: number;
  id_asal: number;
  kode_produksi: string;
  createdAt: string;
  updatedAt: string;
}

export interface Penjualan {
  id: number;
  id_komodity: number;
  ukuran: string;
  jumlah_terjual: number;
  kualitas: string;
  id_produksi: number;
  keterangan: string;
  createdAt: string;
  updatedAt: string;
}

export interface Barang {
  id: number;
  nama: string;
  jumlah: number;
  satuan: string;
  createdAt: string;
  updatedAt: string;
}

export interface TransaksiBarang {
  id: number;
  id_barang: number;
  tanggal: string;
  masuk: number;
  keluar: number;
  keterangan: string;
  createdAt: string;
  updatedAt: string;
}
