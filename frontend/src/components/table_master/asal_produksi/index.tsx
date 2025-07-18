"use client";
import React, { use, useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { PenBox, Search, Trash2 } from "lucide-react";
import { apiRequest } from "@/services/api.service";

type Props = {
    onEditAsal: (asal: any) => void;
    reloadTrigger: boolean;
};

export default function AsalProduksi({ onEditAsal, reloadTrigger }: Props) {
    const [asalProduksiList, setAsalProduksiList] = useState<any[]>([]);

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtYSI6IlN1cGVyIEFkbWliIiwiZW1haWwiOiJzdXBlcmFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJzdXBlcl9hZG1pbiIsImlhdCI6MTc1MjcyNzgzNCwiZXhwIjoxNzU1MzE5ODM0fQ.qgnZfOcI1thz5ZQsTRlWytwMYl-DYV3Opx6UsV5_LNc";

    const fetchDataAsalProduksi = async () => {
        try {
            const data = await apiRequest({
                endpoint: "/asal-produksi",
                token,
            });
            setAsalProduksiList(Array.isArray(data) ? data : [data]);
        } catch (error) {
            console.error("Gagal ambil data Asal Produksi:", error);
        }
    };

    useEffect(() => {
        fetchDataAsalProduksi();
    }, [reloadTrigger]);

    const deleteDataAsalProduksi = async (id: number) => {
        try {
            await apiRequest({
                endpoint: `/asal-produksi/${id}`,
                method: "DELETE",
                token,
            });
            alert("Data berhasil dihapus.");
            fetchDataAsalProduksi();
        } catch (error) {
            console.error("Gagal hapus data Asal Produksi:", error);
            alert("Gagal menghapus data.");
        }
    };

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
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 mt-6">
                <div className="max-w-full overflow-x-auto">
                    <div className="min-w-[1100px]">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableCell isHeader className="dark:text-white">No</TableCell>
                                    <TableCell isHeader className="dark:text-white">Nama</TableCell>
                                    <TableCell isHeader className="dark:text-white">Action</TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {asalProduksiList.map((asal, index) => (
                                    <TableRow key={asal.id}>
                                        <TableCell className="dark:text-gray-200">{index + 1}</TableCell>
                                        <TableCell className="dark:text-gray-200">{asal.nama}</TableCell>
                                        <TableCell>
                                            <button className="bg-yellow-400 hover:bg-yellow-500 text-white hover:underline py-1 px-3 rounded"
                                                onClick={() => { onEditAsal(asal) }}>
                                                <PenBox size={15} />
                                            </button>
                                            <button className="ml-2 bg-red-600 text-white py-1 px-3 rounded hover:underline">
                                                <Trash2 size={15} />
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
