"use client";

import { useState, useEffect } from "react";
import { getPenjualan, createPenjualan, getProduksi, getKomoditas } from "@/services/dummy_api";
import { ChevronDown, ChevronUp, ShoppingCart, Receipt } from "lucide-react";
import { Komoditas, Penjualan, Produksi } from "@/types";
import { DataTable } from "@/components/table/DataTable";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import ToggleDark from "@/components/common/ToggleDark";
import { toast } from "sonner";

export default function KasirPage() {
  const [produksi, setProduksi] = useState<Produksi[]>([]);
  const [komoditas, setKomoditas] = useState<Komoditas[]>([]);
  const [penjualan, setPenjualan] = useState<Penjualan[]>([]);
  
  const [searchProduk, setSearchProduk] = useState("");
  const [searchProduksi, setSearchProduksi] = useState("");
  const [showProdukDropdown, setShowProdukDropdown] = useState(false);
  const [showProduksiDropdown, setShowProduksiDropdown] = useState(false);
  
  const [loading, setLoading] = useState(true);


  const [formData, setFormData] = useState<Partial<Penjualan>>({
    id_komodity: 1,
    jumlah_terjual: 0,
    id_produksi: 1,
    keterangan: "",
  });

  const [showPenjualan, setShowPenjualan] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dataPenjualan, dataProduksi, dataKomoditas] = await Promise.all([
          // dummy API calls
          getPenjualan(),
          getProduksi(),
          getKomoditas()
        ]);
        setPenjualan(dataPenjualan);
        setProduksi(dataProduksi);
        setKomoditas(dataKomoditas);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".relative")) {
        setShowProdukDropdown(false);
        setShowProduksiDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

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
      setIsLoading(true);
      const newPenjualan = await createPenjualan(formData);
      setPenjualan((prev) => [...prev, newPenjualan]);
      setFormData({
        id_komodity: 1,
        jumlah_terjual: 0,
        id_produksi: 1,
        keterangan: "",
      });

      toast.success("Transaksi Berhasil");
    } catch (error) {
      console.error("Error creating penjualan:", error);
      toast.error("Transaksi Gagal");
    } finally {
      setIsLoading(false);
    }
  };

  const penjualanColumns = [
    {
      header: "Produk",
      accessorKey: "komodity" as keyof Penjualan,
      cell: (item: Penjualan) => item.komodity.nama,
    },
    {
      header: "Kode Produksi",
      accessorKey: "produksi" as keyof Penjualan,
      cell: (item: Penjualan) => item.produksi.kode_produksi,
    },
    {
      header: "Jumlah",
      accessorKey: "jumlah_terjual" as keyof Penjualan,
      cell: (item: Penjualan) => `${item.jumlah_terjual} ${item.komodity.satuan}`,
    },
    {
      header: "Keterangan",
      accessorKey: "keterangan" as keyof Penjualan,
      cell: (item: Penjualan) => `${item.keterangan}`,
    },
  ];

  const filteredKomoditas = komoditas.filter((item) =>
    item.nama.toLowerCase().includes(searchProduk.toLowerCase())
  );

  const filteredProduksi = produksi.filter(
    (item) =>
      item.kode_produksi.toLowerCase().includes(searchProduksi.toLowerCase()) ||
      item.ukuran.toLowerCase().includes(searchProduksi.toLowerCase()) ||
      item.kualitas.toLowerCase().includes(searchProduksi.toLowerCase())
  );

  const ProdukSelect = () => {
    const selectedProduk = komoditas.find((k) => k.id === formData.id_komodity);

    return (
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Produk
        </label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowProdukDropdown(!showProdukDropdown)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-left flex items-center justify-between">
            <span>{selectedProduk?.nama || "Pilih Produk"}</span>
            <ChevronDown size={16} />
          </button>

          {showProdukDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
              <div className="p-2">
                <input
                  type="text"
                  placeholder="Cari produk..."
                  value={searchProduk}
                  onChange={(e) => setSearchProduk(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm"
                />
              </div>
              <div className="max-h-48 overflow-y-auto">
                {filteredKomoditas.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, id_komodity: item.id }));
                      setShowProdukDropdown(false);
                      setSearchProduk("");
                    }}
                    className="w-full p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm">
                    {item.nama}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const ProduksiSelect = () => {
    const selectedProduksi = produksi.find((p) => p.id === formData.id_produksi);

    return (
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Kode Produksi
        </label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowProduksiDropdown(!showProduksiDropdown)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-left flex items-center justify-between">
            <span>{selectedProduksi?.kode_produksi || "Pilih Produksi"}</span>
            <ChevronDown size={16} />
          </button>

          {showProduksiDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
              <div className="p-2">
                <input
                  type="text"
                  placeholder="Cari kode produksi..."
                  value={searchProduksi}
                  onChange={(e) => setSearchProduksi(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm"
                />
              </div>
              <div className="max-h-48 overflow-y-auto">
                {filteredProduksi.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, id_produksi: item.id }));
                      setShowProduksiDropdown(false);
                      setSearchProduksi("");
                    }}
                    className="w-full p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.kode_produksi}</span>
                      <span className="text-xs text-gray-500">
                        {item.ukuran} - {item.kualitas}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShoppingCart className="text-blue-600" size={24} />
            <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">Kasir</h1>
          </div>
          <ToggleDark />
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Transaction Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-4">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Receipt size={20} />
            Transaksi Baru
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ProduksiSelect />
              
              <ProdukSelect />

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Jumlah
                </label>
                <Input
                  type="number"
                  name="jumlah_terjual"
                  value={formData.jumlah_terjual}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Keterangan
                </label>
                <Input
                  type="text"
                  name="keterangan"
                  value={formData.keterangan}
                  onChange={handleInputChange}
                  placeholder="Opsional"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                  Memproses...
                </>
              ) : (
                "Tambah Transaksi"
              )}
            </Button>
          </form>
        </div>

        {/* Collapsible Sections */}
        <div className="space-y-3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border">
            <button
              onClick={() => setShowPenjualan(!showPenjualan)}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center gap-2">
                <Receipt size={20} className="text-blue-600" />
                <span className="font-medium">Data Penjualan</span>
              </div>
              {showPenjualan ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>

            {showPenjualan && (
              <div className="px-4 pb-4">
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  </div>
                ) : (
                  <DataTable
                    data={penjualan}
                    columns={penjualanColumns}
                    pageSize={5}
                    emptyMessage="Tidak ada data penjualan"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
