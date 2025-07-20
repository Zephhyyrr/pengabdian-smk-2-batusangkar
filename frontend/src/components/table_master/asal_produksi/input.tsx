"use client";
import { apiRequest } from "@/services/api.service";
import { useEffect, useState } from "react";

type Props = {
  selelectedAsalProduksi: any | null;
  setSelectedAsalProduksi: (asal: any | null) => void;
  onSuccess: () => void;
};

export default function InputAsalProduksi({ selelectedAsalProduksi, setSelectedAsalProduksi, onSuccess }: Props) {
  const [nama, setNama] = useState("");
  const [formMode, setFormMode] = useState<"create" | "update">("create");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selelectedAsalProduksi) {
      setFormMode("update");
      setNama(selelectedAsalProduksi.nama);
    } else {
      setFormMode("create");
      setNama("");
    }
  }, [selelectedAsalProduksi]);

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtYSI6IlN1cGVyIEFkbWliIiwiZW1haWwiOiJzdXBlcmFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJzdXBlcl9hZG1pbiIsImlhdCI6MTc1MjcyNzgzNCwiZXhwIjoxNzU1MzE5ODM0fQ.qgnZfOcI1thz5ZQsTRlWytwMYl-DYV3Opx6UsV5_LNc";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { nama };
      if (formMode === "create") {
        apiRequest({ endpoint: "/asal-produksi", method: "POST", token, data: payload });
        alert("Asal Produksi berhasil ditambahkan");
      } else if (formMode === "update" && selelectedAsalProduksi?.id) {
        apiRequest({ endpoint: `/asal-produksi/${selelectedAsalProduksi.id}`, method: "PUT", token, data: payload });
        alert("Asal Produksi berhasil diupdate");
      }

      setNama("");
      setFormMode("create");
      setSelectedAsalProduksi(null);

      onSuccess(); 
    } catch (err: any) {
      alert("Terjadi kesalahan: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-between gap-4 bg-white dark:bg-gray-900 p-4 rounded-md shadow-sm w-full"
    >
      {/* Label dan Input */}
      <div className="flex items-center gap-4 flex-1">
        <label
          htmlFor="nama"
          className="text-sm font-medium text-gray-700 dark:text-gray-300 w-24"
        >
          Asal Produksi
        </label>
        <input
          type="text"
          id="nama"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          className="flex-1 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Masukkan nama"
          required
        />
      </div>

      {/* Tombol Simpan */}
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Menyimpan..." : formMode === "create" ? "Simpan" : "Update"}
      </button>
    </form>
  );
}
