"use client";
import { useState } from "react";

export default function InputJenisKomoditas() {
  const [nama, setNama] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Data dikirim:", nama);
    setNama("");
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
          Nama
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
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Simpan
      </button>
    </form>
  );
}
