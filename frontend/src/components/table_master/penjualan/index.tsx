"use client";
import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { PenBox, Search, Trash2 } from "lucide-react";
import InputPenjualanForm from "./input";
import { apiRequest } from "@/services/api.service";

export default function Penjualan() {
    const [penjualanList, setPenjualanList] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [penjualanYgDipilih, setPenjualanYgDipilih] = useState<any>(null);

    const fetchDataPenjualan = async () => {
        try {
            const data = await apiRequest({
                endpoint: "/penjualan",
            });
            console.log("DATA DARI BACKEND:", data);
            setPenjualanList(Array.isArray(data) ? data : [data]);
        } catch (err) {
            console.error("Gagal ambil data Penjualan:", err);
        }
    };

    useEffect(() => {
        fetchDataPenjualan();
    }, []);

    const handleOpenUpdateModal = (data: any) => {
        setPenjualanYgDipilih(data);
        setIsUpdateOpen(true);
    };

    const deleteDataPenjualan = async (id: number) => {
        try {
            await apiRequest({
                endpoint: `/penjualan/${id}`,
                method: "DELETE",
            });
            alert("Data berhasil dihapus.");
            fetchDataPenjualan();
        } catch (error) {
            console.error("Gagal hapus data Penjualan", error);
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
                    className="ml-4 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded">
                    Buat Penjualan
                </button>
                <InputPenjualanForm
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    formMode="create"
                    onSubmitSuccess={() => {
                        setIsModalOpen(false);
                        fetchDataPenjualan();
                    }} />
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 mt-6">
                <div className="max-w-full overflow-x-auto">
                    <div className="min-w-[1100px]">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableCell isHeader className="dark:text-white">No</TableCell>
                                    <TableCell isHeader className="dark:text-white">Komoditas</TableCell>
                                    <TableCell isHeader className="dark:text-white">Ukuran</TableCell>
                                    <TableCell isHeader className="dark:text-white">Jumlah Terjual</TableCell>
                                    <TableCell isHeader className="dark:text-white">Kualitas</TableCell>
                                    <TableCell isHeader className="dark:text-white">Produksi</TableCell>
                                    <TableCell isHeader className="dark:text-white">Keterangan</TableCell>
                                    <TableCell isHeader className="dark:text-white">Action</TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {penjualanList.map((item, index) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="dark:text-gray-200">{index + 1}</TableCell>
                                        <TableCell className="dark:text-gray-200">{item.komoditas.nama}</TableCell>
                                        <TableCell className="dark:text-gray-200">{item.produksi.ukuran}</TableCell>
                                        <TableCell className="dark:text-gray-200">{item.jumlah_terjual}</TableCell>
                                        <TableCell className="dark:text-gray-200">{item.produksi.kualitas}</TableCell>
                                        <TableCell className="dark:text-gray-200">{item.produksi.asal_produksi.nama}</TableCell>
                                        <TableCell className="dark:text-gray-200">{item.keterangan}</TableCell>
                                        <TableCell>
                                            <button
                                                onClick={() => handleOpenUpdateModal(item)}
                                                className="bg-green-600 hover:bg-green-700 text-white hover:underline py-1 px-3 rounded">
                                                <PenBox size={15} />
                                            </button>
                                            <button className="ml-2 bg-red-600 text-white py-1 px-3 rounded hover:underline"
                                            onClick={() => deleteDataPenjualan(item.id)}>
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
            <InputPenjualanForm
                isOpen={isUpdateOpen}
                onClose={() => setIsUpdateOpen(false)}
                initialData={penjualanYgDipilih}
                formMode="update"
                onSubmitSuccess={() => {
                    setIsUpdateOpen(false);
                    fetchDataPenjualan();
                }} />
        </>
    );
}
