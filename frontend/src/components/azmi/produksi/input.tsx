"use client";
import { useState } from "react";

export default function InputProduksi() {
    const [nama, setNama] = useState("");
    const [kode, setKode] = useState(""); 

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Data dikirim:", { nama, kode });
        setNama("");
        setKode("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md space-y-4"
        >
            <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                <label
                    htmlFor="nama"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    Asal Produksi
                </label>
                <input
                    type="text"
                    id="nama"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    className="md:col-span-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Masukkan nama asal produksi"
                    required
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                <label
                    htmlFor="KodeProduksi"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    Kode Produksi
                </label>
                <select
                    id="kode"
                    value={kode}
                    onChange={(e) => setKode(e.target.value)}
                    className="md:col-span-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                >
                    <option value="">Pilih Asal Produksi</option>
                    <option value="Lapangan 1">Lapangan 1</option>
                    <option value="Lapangan 2">Lapangan 2</option>
                </select>
            </div>

            {/* Tombol Simpan */}
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition-colors duration-200"
                >
                    Simpan
                </button>
            </div>
        </form>
    );
}
