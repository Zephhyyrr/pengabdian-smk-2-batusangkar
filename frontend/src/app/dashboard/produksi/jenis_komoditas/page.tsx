    "use client";
    import Jenis_Komoditas from "@/components/azmi/jenis_komoditas";
    import InputJenisKomoditas from "@/components/azmi/jenis_komoditas/input";
    import DashboardLayout from "@/components/layouts/DashboardLayout";

    export default function JenisKomoditasPage() {
        return (
            <DashboardLayout title="Jenis Komoditas" role="produksi">
                <div className="mt-5">
                    <InputJenisKomoditas />
                </div>
                <div className="mt-6">
                    <Jenis_Komoditas />
                </div>
            </DashboardLayout>
        );
    }
