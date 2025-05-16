"use client";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/table/DataTable";
import CreateBarangModal from "@/components/dashboard/CreateBarangModal";
// import { getBarang } from "@/services/dummy_api";
import { apiRequest } from "@/services/api.service";
import { Barang } from "@/types";

export default function DashboardBarang() {
  const [barang, setBarang] = useState<Barang[]>([]);

  // Selagi belum ada login
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtYSI6IlN1cGVyIEFkbWliIiwiZW1haWwiOiJzdXBlcmFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJzdXBlcl9hZG1pbiIsImlhdCI6MTc0NzM5NzQ1NCwiZXhwIjoxNzQ5OTg5NDU0fQ.ky6khUQTS2z1SXPea-8j8yun-EtaRb-rAD6RuTSYPpA";

  const [openCreate, setOpenCreate] = useState(false);

  const handleCreate = () => {
    setOpenCreate(true);
  };

  const fetchData = async () => {
    try {
      const data = await apiRequest({
        endpoint: "/barang",
        token: token,
      });

      setBarang(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // dummy api
    // getBarang().then((data) => setBarang(data));
    fetchData();
  }, []);

  return (
    <DashboardLayout title="Barang">
      <div className="">
        <DataTable
          data={barang}
          create={handleCreate}
          columns={[
            { header: "ID", accessorKey: "id" },
            { header: "Nama Barang", accessorKey: "nama" },
            { header: "Jumlah", accessorKey: "jumlah" },
            { header: "Satuan", accessorKey: "satuan" },
            { header: "Tanggal Masuk", accessorKey: "createdAt" },
          ]}
          pageSize={10}
          emptyMessage="No items found."
        />
      </div>
      <CreateBarangModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onCreated={() => {
          fetchData();
        }}
        token={token}
      />
    </DashboardLayout>
  );
}
