"use client";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Penjualan from "@/components/azmi/penjualan";

export default function JenisKomoditasPage() {
    return (
        <DashboardLayout title="Jenis Komoditas" role="produksi">
            <div className="mt-6">
                <Penjualan />
            </div>
        </DashboardLayout>
    );
}
