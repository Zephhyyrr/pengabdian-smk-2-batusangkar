"use client";
import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";
import UpdateKomoditasForm from "./update";
import { apiRequest } from "@/services/api.service";
import InputKomoditasForm from "./input";

export default function Komoditas() {
    const [komoditasList, setKomoditasList] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);

    const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtYSI6IlN1cGVyIEFkbWliIiwiZW1haWwiOiJzdXBlcmFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJzdXBlcl9hZG1pbiIsImlhdCI6MTc0OTcwNDMxNCwiZXhwIjoxNzUyMjk2MzE0fQ.gPsOkIEBS4bfKHEz-G_JgjEWOl9IU1dhL1U9Bl0TD94";

    const fetchDataJenis = async () => {
        try {
            const data = await apiRequest({
                endpoint: "/api/komoditas",
                token,
            });
            console.log("DATA DARI BACKEND:", data);
            setKomoditasList(Array.isArray(data) ? data : [data]);
        } catch (err) {
            console.error("Gagal ambil data jenis:", err);
        }
    };

    useEffect(() => {
        fetchDataJenis();
    }, []);

    return (
        <>
            {/* Search & Button */}
            <div className="flex justify-between items-center w-full mb-4">
                <form className="w-full max-w-md">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search Here..."
                            className="w-full rounded-lg border px-6 py-3 shadow focus:border-blue-500 focus:outline-none 
                         bg-white text-gray-900 dark:bg-gray-900 dark:text-white dark:border-gray-700"
                        />
                        <button
                            type="submit"
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                            aria-label="search-icon"
                        >
                            <Search className="h-6 w-6" />
                        </button>
                    </div>
                </form>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="ml-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
                    Buat Komoditas Baru
                </button>
                <InputKomoditasForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 mt-6">
                <div className="max-w-full overflow-x-auto">
                    <div className="min-w-[1100px]">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableCell isHeader className="dark:text-white">No</TableCell>
                                    <TableCell isHeader className="dark:text-white">Jenis Komoditas</TableCell>
                                    <TableCell isHeader className="dark:text-white">Nama</TableCell>
                                    <TableCell isHeader className="dark:text-white">Deskripsi</TableCell>
                                    <TableCell isHeader className="dark:text-white">Satuan</TableCell>
                                    <TableCell isHeader className="dark:text-white">Jumlah</TableCell>
                                    <TableCell isHeader className="dark:text-white">Action</TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {komoditasList.map((item, index) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="dark:text-gray-200">{index + 1}</TableCell>
                                        <TableCell className="dark:text-gray-200">{item.nama_jenis}</TableCell> 
                                        <TableCell className="dark:text-gray-200">{item.nama}</TableCell> 
                                        <TableCell className="dark:text-gray-200">{item.deskripsi}</TableCell>
                                        <TableCell className="dark:text-gray-200">{item.satuan} KG</TableCell>
                                        <TableCell className="dark:text-gray-200">{item.jumlah}</TableCell>
                                        <TableCell>
                                            <button
                                                onClick={() => setIsUpdateOpen(true)}
                                                className="bg-green-600 hover:bg-green-700 text-white hover:underline py-1 px-3 rounded">
                                                Edit
                                            </button>
                                            <UpdateKomoditasForm isOpen={isUpdateOpen} onClose={() => setIsUpdateOpen(false)} />
                                            <button className="ml-2 bg-red-600 text-white py-1 px-3 rounded hover:underline">
                                                Hapus
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>

            {/* Pagination */}
            <nav aria-label="Page navigation" className="flex justify-center mt-6">
                <ul className="inline-flex -space-x-px text-sm">
                    <li>
                        <button className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white dark:bg-gray-900 dark:text-gray-300 border border-e-0 border-gray-300 dark:border-gray-700 rounded-s-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                            Previous
                        </button>
                    </li>
                    {[1, 2, 3].map((p) => (
                        <li key={p}>
                            <button
                                className={`flex items-center justify-center px-3 h-8 leading-tight border ${p === 1
                                    ? "text-blue-600 border-gray-300 bg-blue-50 dark:bg-blue-900 dark:border-gray-700"
                                    : "text-gray-500 bg-white dark:bg-gray-900 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700"
                                    }`}
                            >
                                {p}
                            </button>
                        </li>
                    ))}
                    <li>
                        <button className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white dark:bg-gray-900 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-e-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    );
}
