"use client";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import InputProduksi from "@/components/azmi/produksi/input";
import Produksi from "@/components/azmi/produksi";

export default function JenisKomoditasPage() {
    return (
        <DashboardLayout title="Jenis Komoditas" role="produksi">
            <div className="mt-5">
                <InputProduksi />
            </div>
            <div className="mt-6">
                <Produksi />
            </div>
        </DashboardLayout>
    );
}
