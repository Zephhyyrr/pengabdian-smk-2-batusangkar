"use client";
import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { PenBox, Search, Trash2 } from "lucide-react";
import { apiRequest } from "@/services/api.service";
import InputProduksiForm from "./input";

export default function Produksi() {
    const [produksiList, setProduksiList] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [selectedProduksi, setSelectedProduksi] = useState(null);
    const [produksiYgDipilih, setProduksiYgDipilih] = useState<any>(null);

    const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtYSI6IlN1cGVyIEFkbWliIiwiZW1haWwiOiJzdXBlcmFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJzdXBlcl9hZG1pbiIsImlhdCI6MTc1MjcyNzgzNCwiZXhwIjoxNzU1MzE5ODM0fQ.qgnZfOcI1thz5ZQsTRlWytwMYl-DYV3Opx6UsV5_LNc";

    const fetchDataProduksi = async () => {
        try {
            const data = await apiRequest({
                endpoint: "/produksi",
                token,
            });
            console.log("DATA DARI BACKEND:", data);
            setProduksiList(Array.isArray(data) ? data : [data]);
        } catch (err) {
            console.error("Gagal ambil data Produksi:", err);
        }
    };

    useEffect(() => {
        fetchDataProduksi();
    }, []);

    const handleOpenUpdateModal = (data: any) => {
        setProduksiYgDipilih(data);
        setIsUpdateOpen(true);
    };

    const deleteDataProduksi = async (id: number) => {
        try {
            await apiRequest({
                endpoint: `/produksi/${id}`,
                method: "DELETE",
                token,
            });
            alert("Data berhasil dihapus.");
            fetchDataProduksi();
        } catch (error) {
            console.error("Gagal hapus data Produksi", error);
            alert("Gagal menghapus data.")
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
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded">
                    Tambah Produksi
                </button>
                <InputProduksiForm
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    formMode="create"
                    initialData={null}
                    onSubmitSuccess={() => {
                        setIsModalOpen(false);
                        fetchDataProduksi();
                    }}
                />
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 mt-6">
                <div className="max-w-full overflow-x-auto">
                    <div className="min-w-[1100px]">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableCell isHeader className="dark:text-white">No</TableCell>
                                    <TableCell isHeader className="dark:text-white">Kode Produksi</TableCell>
                                    <TableCell isHeader className="dark:text-white">Asal Produksi</TableCell>
                                    <TableCell isHeader className="dark:text-white">Ukuran</TableCell>
                                    <TableCell isHeader className="dark:text-white">Kualitas</TableCell>
                                    <TableCell isHeader className="dark:text-white">Action</TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {produksiList.map((item, index) => (
                                    <TableRow key={item}>
                                        <TableCell className="dark:text-gray-200">{index + 1}</TableCell>
                                        <TableCell className="dark:text-gray-200">{item.kode_produksi}</TableCell>
                                        <TableCell className="dark:text-gray-200">{item.asal_produksi.nama}</TableCell>
                                        <TableCell className="dark:text-gray-200">{item.ukuran}</TableCell>
                                        <TableCell className="dark:text-gray-200">{item.kualitas}</TableCell>
                                        <TableCell>
                                            <button
                                                className="bg-yellow-500 hover:bg-yellow-400 text-white hover:underline py-1 px-3 rounded"
                                                onClick={() =>
                                                    handleOpenUpdateModal(item)
                                                }
                                            >
                                                <PenBox size={15} />
                                            </button>
                                            <button
                                                onClick={() => deleteDataProduksi(item.id)}
                                                className="ml-2 bg-red-600 text-white py-1 px-3 rounded hover:underline">
                                                <Trash2 size={15} />
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div >

            {/* Pagination */}
            < nav aria-label="Page navigation" className="flex justify-center mt-6" >
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
            </nav >
            <InputProduksiForm
                isOpen={isUpdateOpen}
                onClose={() => setIsUpdateOpen(false)}
                formMode="update"
                initialData={produksiYgDipilih}
                onSubmitSuccess={() => {
                    setIsUpdateOpen(false);
                    fetchDataProduksi();
                }}
            />
        </>
    );
}
