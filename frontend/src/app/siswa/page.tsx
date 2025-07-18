"use client";

import { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  ShoppingCart,
  Receipt,
  AlertCircle,
  Package,
  Search,
  X,
} from "lucide-react";
import { Komoditas, Penjualan, Produksi } from "@/types";
import { DataTable } from "@/components/table/DataTable";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import ToggleDark from "@/components/common/ToggleDark";
import { toast } from "sonner";
import { apiRequest } from "@/services/api.service";

export default function KasirPage() {
  const [produksi, setProduksi] = useState<Produksi[]>([]);
  const [komoditas, setKomoditas] = useState<Komoditas[]>([]);
  const [penjualan, setPenjualan] = useState<Penjualan[]>([]);

  const [searchProduk, setSearchProduk] = useState("");
  const [searchProduksi, setSearchProduksi] = useState("");
  const [showProdukDropdown, setShowProdukDropdown] = useState(false);
  const [showProduksiDropdown, setShowProduksiDropdown] = useState(false);

  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<Partial<Penjualan>>({
    id_komodity: 0,
    jumlah_terjual: 0,
    id_produksi: 0,
    keterangan: "",
  });

  const [showPenjualan, setShowPenjualan] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dataPenjualan, dataProduksi, dataKomoditas] = await Promise.all([
          apiRequest({ endpoint: "/penjualan" }),
          apiRequest({ endpoint: "/produksi" }),
          apiRequest({ endpoint: "/komoditas" }),
        ]);
        setPenjualan(dataPenjualan);
        setProduksi(dataProduksi);
        setKomoditas(dataKomoditas);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Gagal memuat data");
      } finally {
        setLoading(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".dropdown-container")) {
        setShowProdukDropdown(false);
        setShowProduksiDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    fetchData();

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.id_komodity) {
      errors.id_komodity = "Produk harus dipilih";
    }

    if (!formData.id_produksi) {
      errors.id_produksi = "Kode produksi harus dipilih";
    }

    if (!formData.jumlah_terjual || formData.jumlah_terjual <= 0) {
      errors.jumlah_terjual = "Jumlah harus lebih dari 0";
    }

    // Validasi stok tersedia
    if (formData.id_komodity && formData.jumlah_terjual) {
      const selectedKomoditas = komoditas.find((k) => k.id === formData.id_komodity);
      if (selectedKomoditas && formData.jumlah_terjual > selectedKomoditas.jumlah) {
        errors.jumlah_terjual = `Stok tidak mencukupi. Tersedia: ${selectedKomoditas.jumlah} ${selectedKomoditas.satuan}`;
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "jumlah_terjual" || name === "id_komodity" || name === "id_produksi"
          ? Number(value)
          : value,
    }));

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Mohon periksa kembali data yang diisi");
      return;
    }

    try {
      setIsLoading(true);
      const newPenjualan = await apiRequest({
        endpoint: "/penjualan",
        method: "POST",
        data: formData,
      });

      // Update stok komoditas
      const updatedKomoditas = komoditas.map((k) =>
        k.id === formData.id_komodity
          ? { ...k, jumlah: k.jumlah - (formData.jumlah_terjual || 0) }
          : k
      );
      setKomoditas(updatedKomoditas);
      const [dataPenjualan] = await Promise.all([apiRequest({ endpoint: "/penjualan" })]);
      setPenjualan(dataPenjualan);
      setFormData({
        id_komodity: 0,
        jumlah_terjual: 0,
        id_produksi: 0,
        keterangan: "",
      });
      setFormErrors({});

      toast.success("Transaksi berhasil disimpan");
    } catch (error) {
      console.error("Error creating penjualan:", error);
      toast.error("Transaksi gagal disimpan");
    } finally {
      setIsLoading(false);
    }
  };

  const penjualanColumns = [
    {
      header: "Produk",
      accessorKey: "komoditas" as keyof Penjualan,
      cell: (item: Penjualan) => (
        <div className="flex items-center gap-2">
          <Package size={16} className="text-gray-500" />
          <span className="font-medium">{item.komoditas?.nama}</span>
        </div>
      ),
    },
    {
      header: "Kode Produksi",
      accessorKey: "produksi" as keyof Penjualan,
      cell: (item: Penjualan) => (
        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs font-mono">
          {item.produksi?.kode_produksi}
        </span>
      ),
    },
    {
      header: "Jumlah",
      accessorKey: "jumlah_terjual" as keyof Penjualan,
      cell: (item: Penjualan) => (
        <span className="font-medium">
          {item.jumlah_terjual} {item.komoditas?.satuan}
        </span>
      ),
    },
    {
      header: "Keterangan",
      accessorKey: "keterangan" as keyof Penjualan,
      cell: (item: Penjualan) => (
        <span className="text-gray-600 dark:text-gray-400">{item.keterangan || "-"}</span>
      ),
    },
  ];

  const filteredKomoditas = komoditas.filter(
    (item) =>
      item.nama.toLowerCase().includes(searchProduk.toLowerCase()) ||
      item.deskripsi?.toLowerCase().includes(searchProduk.toLowerCase())
  );

  const filteredProduksi = produksi.filter(
    (item) =>
      item.kode_produksi.toLowerCase().includes(searchProduksi.toLowerCase()) ||
      item.ukuran?.toLowerCase().includes(searchProduksi.toLowerCase()) ||
      item.kualitas?.toLowerCase().includes(searchProduksi.toLowerCase())
  );

  const ProdukSelect = () => {
    const selectedProduk = komoditas.find((k) => k.id === formData.id_komodity);

    return (
      <div className="dropdown-container relative">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Produk *
        </label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowProdukDropdown(!showProdukDropdown)}
            className={`w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-left flex items-center justify-between transition-colors ${
              formErrors.id_komodity
                ? "border-red-500 dark:border-red-400"
                : "border-gray-300 dark:border-gray-600"
            }`}>
            <span className={selectedProduk ? "text-gray-900 dark:text-gray-100" : "text-gray-500"}>
              {selectedProduk?.nama || "Pilih Produk"}
            </span>
            <ChevronDown size={16} />
          </button>

          {formErrors.id_komodity && (
            <div className="flex items-center gap-1 mt-1 text-red-500 text-xs">
              <AlertCircle size={12} />
              <span>{formErrors.id_komodity}</span>
            </div>
          )}

          {showProdukDropdown && (
            <div className="absolute z-20 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-64 overflow-hidden">
              <div className="p-2 border-b border-gray-200 dark:border-gray-600">
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Cari produk..."
                    value={searchProduk}
                    onChange={(e) => setSearchProduk(e.target.value)}
                    className="w-full pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {searchProduk && (
                    <button
                      type="button"
                      onClick={() => setSearchProduk("")}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>
              <div className="max-h-48 overflow-y-auto">
                {filteredKomoditas.length > 0 ? (
                  filteredKomoditas.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, id_komodity: item.id }));
                        setShowProdukDropdown(false);
                        setSearchProduk("");
                      }}
                      className="w-full p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{item.nama}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {item.deskripsi}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Stok: {item.jumlah} {item.satuan}
                          </div>
                          {item.jumlah <= 5 && (
                            <div className="text-xs text-red-500 font-medium">Stok Menipis!</div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
                    Tidak ada produk ditemukan
                  </div>
                )}
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
      <div className="dropdown-container relative">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Kode Produksi *
        </label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowProduksiDropdown(!showProduksiDropdown)}
            className={`w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-left flex items-center justify-between transition-colors ${
              formErrors.id_produksi
                ? "border-red-500 dark:border-red-400"
                : "border-gray-300 dark:border-gray-600"
            }`}>
            <span
              className={selectedProduksi ? "text-gray-900 dark:text-gray-100" : "text-gray-500"}>
              {selectedProduksi?.kode_produksi || "Pilih Kode Produksi"}
            </span>
            <ChevronDown size={16} />
          </button>

          {formErrors.id_produksi && (
            <div className="flex items-center gap-1 mt-1 text-red-500 text-xs">
              <AlertCircle size={12} />
              <span>{formErrors.id_produksi}</span>
            </div>
          )}

          {showProduksiDropdown && (
            <div className="absolute z-20 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-64 overflow-hidden">
              <div className="p-2 border-b border-gray-200 dark:border-gray-600">
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Cari kode produksi..."
                    value={searchProduksi}
                    onChange={(e) => setSearchProduksi(e.target.value)}
                    className="w-full pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {searchProduksi && (
                    <button
                      type="button"
                      onClick={() => setSearchProduksi("")}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>
              <div className="max-h-48 overflow-y-auto">
                {filteredProduksi.length > 0 ? (
                  filteredProduksi.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, id_produksi: item.id }));
                        setShowProduksiDropdown(false);
                        setSearchProduksi("");
                      }}
                      className="w-full p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                      <div className="flex justify-between items-center">
                        <span className="font-medium font-mono">{item.kode_produksi}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {item.ukuran} - {item.kualitas}
                        </span>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
                    Tidak ada kode produksi ditemukan
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const selectedKomoditas = komoditas.find((k) => k.id === formData.id_komodity);

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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <ProdukSelect />
              <ProduksiSelect />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Jumlah *
                  {selectedKomoditas && (
                    <span className="text-xs text-gray-500 ml-2">
                      (Tersedia: {selectedKomoditas.jumlah} {selectedKomoditas.satuan})
                    </span>
                  )}
                </label>
                <Input
                  type="number"
                  name="jumlah_terjual"
                  value={formData.jumlah_terjual || ""}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="1"
                  max={selectedKomoditas?.jumlah || undefined}
                  className={`w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    formErrors.jumlah_terjual
                      ? "border-red-500 dark:border-red-400"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                />
                {formErrors.jumlah_terjual && (
                  <div className="flex items-center gap-1 mt-1 text-red-500 text-xs">
                    <AlertCircle size={12} />
                    <span>{formErrors.jumlah_terjual}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Keterangan
                </label>
                <Input
                  type="text"
                  name="keterangan"
                  value={formData.keterangan || ""}
                  onChange={handleInputChange}
                  placeholder="Keterangan tambahan (opsional)"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                  Memproses...
                </>
              ) : (
                <>
                  <ShoppingCart size={18} />
                  Simpan Transaksi
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Collapsible Sales Data */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border">
          <button
            onClick={() => setShowPenjualan(!showPenjualan)}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors rounded-lg">
            <div className="flex items-center gap-2">
              <Receipt size={20} className="text-blue-600" />
              <span className="font-medium">Riwayat Penjualan</span>
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs">
                {penjualan.length} transaksi
              </span>
            </div>
            {showPenjualan ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {showPenjualan && (
            <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-600">
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-gray-500">Memuat data...</p>
                </div>
              ) : (
                <div className="mt-4">
                  <DataTable
                    data={penjualan}
                    columns={penjualanColumns}
                    pageSize={10}
                    emptyMessage="Belum ada transaksi penjualan"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
