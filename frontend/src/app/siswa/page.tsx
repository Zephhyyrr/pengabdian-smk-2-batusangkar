"use client";

import { useState, useEffect } from "react";
import { getPenjualan, createPenjualan, getProduksi } from "@/services/dummy_api";
import { ChevronRight } from "lucide-react";
import { Penjualan, Produksi } from "@/types";
import { DataTable } from "@/components/table/DataTable";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import ToggleDark from "@/components/common/ToggleDark";

export default function KasirPage() {
  const [produksi, setProduksi] = useState<Produksi[]>([]);
  const [penjualan, setPenjualan] = useState<Penjualan[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<Partial<Penjualan>>({
    id_komodity: 1,
    jumlah_terjual: 0,
    id_produksi: 1,
    keterangan: "",
  });

  const [showProduksi, setShowProduksi] = useState(true);
  const [showPenjualan, setShowPenjualan] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataPenjualan = await getPenjualan();
        setPenjualan(dataPenjualan);

        const dataProduksi = await getProduksi();
        setProduksi(dataProduksi);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "jumlah_terjual" || name === "id_komodity" || name === "id_produksi"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newPenjualan = await createPenjualan(formData);
      setPenjualan((prev) => [...prev, newPenjualan]);
      setFormData({
        id_komodity: 1,
        jumlah_terjual: 0,
        id_produksi: 1,
        keterangan: "",
      });
      alert("Transaksi berhasil ditambahkan (simulasi)");
    } catch (error) {
      console.error("Error creating penjualan:", error);
      alert("Gagal menambahkan transaksi");
    }
  };

  const produksiColumns = [
    {
      header: "Kode Produksi",
      accessorKey: "kode_produksi" as keyof Produksi,
    },
    {
      header: "Ukuran",
      accessorKey: "ukuran" as keyof Produksi,
    },
    {
      header: "Kualitas",
      accessorKey: "kualitas" as keyof Produksi,
    },
    {
      header: "Asal Produksi",
      accessorKey: "asal_produksi" as keyof Produksi,
      cell: (item: Produksi) => item.asal_produksi.nama,
    },
    {
      header: "Tanggal Produksi",
      accessorKey: "createdAt" as keyof Produksi,
      cell: (item: Produksi) => new Date(item.createdAt).toLocaleDateString("id-ID"),
    },
  ];

  const penjualanColumns = [
    {
      header: "Komoditas",
      accessorKey: "komodity" as keyof Penjualan,
      cell: (item: Penjualan) => item.komodity.nama,
    },
    {
      header: "Ukuran",
      accessorKey: "ukuran" as keyof Penjualan,
    },
    {
      header: "Jumlah Terjual",
      accessorKey: "jumlah_terjual" as keyof Penjualan,
      cell: (item: Penjualan) => `${item.jumlah_terjual} ${item.komodity.satuan}`,
    },
    {
      header: "Kualitas",
      accessorKey: "kualitas" as keyof Penjualan,
    },
    {
      header: "Kode Produksi",
      accessorKey: "produksi" as keyof Penjualan,
      cell: (item: Penjualan) => item.produksi.kode_produksi,
    },
    {
      header: "Keterangan",
      accessorKey: "keterangan" as keyof Penjualan,
    },
  ];

  return (
    <div className="p-6 space-y-8 bg-white dark:bg-gray-900 text-black dark:text-gray-100 transition-colors">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard Kasir</h1>
        <ToggleDark />
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-6">
        <h2 className="text-xl font-semibold">Tambah Transaksi Penjualan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Komoditas
            </label>
            <select
              name="id_komodity"
              value={formData.id_komodity}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2 h-10 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
              <option value={1}>Beras Premium</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Jumlah Terjual
            </label>
            <Input
              type="number"
              name="jumlah_terjual"
              value={formData.jumlah_terjual}
              onChange={handleInputChange}
              placeholder="Masukkan jumlah terjual"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Kode Produksi
            </label>
            <select
              name="id_produksi"
              value={formData.id_produksi}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2 h-10 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
              <option value={1}>PROD001</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Keterangan
            </label>
            <Input
              type="text"
              name="keterangan"
              value={formData.keterangan}
              onChange={handleInputChange}
              placeholder="Masukkan keterangan"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Tambah Transaksi
          </Button>
        </div>
      </div>
      <div className="space-y-4"></div>

      {/* Data produksi */}
      <h2
        className="text-xl font-semibold mb-2 flex items-center gap-2 cursor-pointer select-none"
        onClick={() => setShowProduksi((prev) => !prev)}>
        <ChevronRight
          size={20}
          className={`transition-transform duration-300 ${
            showProduksi ? "rotate-90" : "rotate-0"
          }`}
        />
        Daftar Produksi
      </h2>

      {showProduksi ? (
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <DataTable
              data={produksi}
              columns={produksiColumns}
              pageSize={5}
              emptyMessage="Tidak ada data produksi."
            />
          )}
        </div>
      ) : null}

      {/* Data penjualan */}
      <h2
        className="text-xl font-semibold mb-2 flex items-center gap-2 cursor-pointer select-none"
        onClick={() => setShowPenjualan((prev) => !prev)}>
        <ChevronRight
          size={20}
          className={`transition-transform duration-300 ${
            showPenjualan ? "rotate-90" : "rotate-0"
          }`}
        />
        Daftar Penjualan
      </h2>

      {showPenjualan ? (
        loading ? (
          <p>Loading...</p>
        ) : (
          <DataTable
            data={penjualan}
            columns={penjualanColumns}
            pageSize={5}
            emptyMessage="Tidak ada data penjualan."
          />
        )
      ) : null}

      
      <div className="space-y-4"></div>
    </div>
  );
}
