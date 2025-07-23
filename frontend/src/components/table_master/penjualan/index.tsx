"use client";
import { apiRequest } from "@/services/api.service";
import { DataTable } from "@/components/table/DataTable";
import { Penjualan as PenjualanType } from "@/types";
import ConfirmButton from "@/components/common/ConfirmButton";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { PenBox, Trash2 } from "lucide-react";
import InputPenjualanForm from "./input";

export default function Penjualan() {
    const [penjualanList, setPenjualanList] = useState<PenjualanType[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [penjualanYgDipilih, setPenjualanYgDipilih] = useState<PenjualanType | null>(null);
    const [loading, setLoading] = useState(true);
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const fetchDataPenjualan = async () => {
        try {
            setLoading(true);
            const data = await apiRequest({
                endpoint: "/penjualan",
            });
            console.log("DATA DARI BACKEND:", data);
            setPenjualanList(Array.isArray(data) ? data : [data]);
        } catch (err) {
            console.error("Gagal ambil data Penjualan:", err);
            toast.error("Gagal mengambil data penjualan.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDataPenjualan();
    }, []);

    const handleOpenUpdateModal = (data: PenjualanType) => {
        setPenjualanYgDipilih(data);
        setIsUpdateOpen(true);
    };

    const handleDeleteClick = (id: number) => {
        setDeleteId(id);
        setShowConfirm(true);
    };

    const confirmDelete = async () => {
        if (deleteId !== null) {
            try {
                await apiRequest({
                    endpoint: `/penjualan/${deleteId}`,
                    method: "DELETE",
                });
                toast.success("Data berhasil dihapus.");
                fetchDataPenjualan();
            } catch (error) {
                console.error("Gagal hapus data Penjualan", error);
                toast.error("Gagal menghapus data.")
            } finally {
                setShowConfirm(false);
                setDeleteId(null);
            }
        }
    };

    const columns = [
        {
            header: "#",
            accessorKey: "id" as keyof PenjualanType,
            cell: (item: PenjualanType) => (penjualanList.findIndex((p) => p.id === item.id) + 1).toString(),
        },
        { header: "Komoditas", accessorKey: "komoditas" as keyof PenjualanType, cell: (item: PenjualanType) => item.komoditas?.nama || "" },
        { header: "Ukuran", accessorKey: "produksi" as keyof PenjualanType, cell: (item: PenjualanType) => item.produksi?.ukuran || "" },
        { header: "Jumlah Terjual", accessorKey: "jumlah_terjual" as keyof PenjualanType },
        { header: "Kualitas", accessorKey: "produksi" as keyof PenjualanType, cell: (item: PenjualanType) => item.produksi?.kualitas || "" },
        { header: "Produksi", accessorKey: "produksi" as keyof PenjualanType, cell: (item: PenjualanType) => item.produksi?.asal_produksi?.nama || "" },
        { header: "Keterangan", accessorKey: "keterangan" as keyof PenjualanType },
        {
            header: "Aksi",
            accessorKey: "id" as keyof PenjualanType,
            cell: (item: PenjualanType) => (
                <div className="flex gap-2">
                    <button
                        onClick={() => handleOpenUpdateModal(item)}
                        className="p-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded"
                    >
                        <PenBox size={16} />
                    </button>
                    <button
                        onClick={() => handleDeleteClick(item.id)}
                        className="p-2 bg-red-600 hover:bg-red-500 text-white rounded"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <>
            <div className="flex justify-end items-center w-full mb-4">
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
            <DataTable
                data={penjualanList}
                columns={columns}
                loading={loading}
                emptyMessage="Tidak ada data penjualan."
            />
            <InputPenjualanForm
                isOpen={isUpdateOpen}
                onClose={() => setIsUpdateOpen(false)}
                initialData={penjualanYgDipilih}
                formMode="update"
                onSubmitSuccess={() => {
                    setIsUpdateOpen(false);
                    fetchDataPenjualan();
                }} />
            {showConfirm && (
                <ConfirmButton
                    message="Yakin ingin menghapus data ini?"
                    onConfirm={confirmDelete}
                    onCancel={() => setShowConfirm(false)}
                />
            )}
        </>
    );
}
