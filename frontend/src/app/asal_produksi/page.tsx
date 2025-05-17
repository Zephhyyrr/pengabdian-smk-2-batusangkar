"use client";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import AsalProduksi from "@/components/asal_produksi";
import InputAsalProduksi from "@/components/asal_produksi/input";

export default function JenisKomoditasPage() {
    return (
        <DashboardLayout title="Jenis Komoditas" role="produksi">
            <div className="mt-5">
                <InputAsalProduksi />
            </div>
            <div className="mt-6">
                <AsalProduksi />
            </div>
        </DashboardLayout>
    );
}
