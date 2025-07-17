"use client";
import { useEffect, useState } from "react";
import { apiRequest } from "@/services/api.service";

type Props = {
  selectedJenis: any | null;
  setSelectedJenis: (jenis: any | null) => void;
  onSuccess: () => void;
};

export default function InputJenisKomoditas({ selectedJenis, setSelectedJenis, onSuccess }: Props) {
  const [name, setName] = useState("");
  const [formMode, setFormMode] = useState<"create" | "update">("create");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedJenis) {
      setFormMode("update");
      setName(selectedJenis.name);
    } else {
      setFormMode("create");
      setName("");
    }
  }, [selectedJenis]);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtYSI6IlN1cGVyIEFkbWliIiwiZW1haWwiOiJzdXBlcmFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJzdXBlcl9hZG1pbiIsImlhdCI6MTc1MjcyNzgzNCwiZXhwIjoxNzU1MzE5ODM0fQ.qgnZfOcI1thz5ZQsTRlWytwMYl-DYV3Opx6UsV5_LNc";

  // Submit create atau update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { name };
      if (formMode === "create") {
        await apiRequest({ endpoint: "/jenis", method: "POST", token, data: payload });
        alert("Jenis berhasil ditambahkan");
      } else if (formMode === "update" && selectedJenis?.id) {
        await apiRequest({ endpoint: `/jenis/${selectedJenis.id}`, method: "PUT", token, data: payload });
        alert("Jenis berhasil diupdate");
      }

      setName("");
      setFormMode("create");
      setSelectedJenis(null);

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
          className="text-sm font-medium text-gray-700 dark:text-gray-300 w-24"
        >
          Nama
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Masukkan jenis"
          required
        />
      </div>

      {/* Tombol Simpan */}
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Menyimpan..." : formMode === "create" ? "Simpan" : "Update"}
      </button>
    </form>
  );
}
