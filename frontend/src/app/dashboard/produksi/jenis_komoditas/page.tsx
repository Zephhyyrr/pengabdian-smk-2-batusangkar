"use client";
import Jenis_Komoditas from "@/components/azmi/jenis_komoditas";
import InputJenisKomoditas from "@/components/azmi/jenis_komoditas/input";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useState } from "react";

export default function JenisKomoditasPage() {
    const [selectedJenis, setSelectedJenis] = useState<any | null>(null);

    const handleEdit = (jenis: any) => {
        setSelectedJenis(jenis);
    };
    return (
        <DashboardLayout title="Jenis Komoditas" role="produksi">
            <div className="mt-5">
                <InputJenisKomoditas selectedJenis={selectedJenis} setSelectedJenis={setSelectedJenis}/>
            </div>
            <div className="mt-6">
                <Jenis_Komoditas onEdit={handleEdit} />
            </div>
        </DashboardLayout>
    );
}
