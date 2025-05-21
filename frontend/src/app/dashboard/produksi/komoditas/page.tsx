"use client";
import Komoditas from "@/components/azmi/komoditas";
import DashboardLayout from "@/components/layouts/DashboardLayout";

export default function JenisKomoditasPage() {
    return (
        <DashboardLayout title="Jenis Komoditas" role="produksi">
            <div className="mt-6">
                <Komoditas />
            </div>
        </DashboardLayout>
    );
}
