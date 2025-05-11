"use client";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/table/DataTable";
import { getBarang } from "@/services/dummy_api";
import { Barang } from "@/types";

export default function DashboardBarang() {
    const [barang, setBarang] = useState<Barang[]>([]);
  
    useEffect(() => {
      getBarang().then((data) => setBarang(data));
    }, []);
  
  return (
    <DashboardLayout title="Barang">
      <div className="bg-gray-50 dark:bg-gray-800">
        <DataTable 
          data={barang}
          columns={[
            { header: "ID", accessorKey: "id" },
            { header: "Nama Barang", accessorKey: "nama" },
            { header: "Jumlah", accessorKey: "satuan" },
            { header: "Satuan", accessorKey: "createdAt" },
            { header: "Tanggal Masuk", accessorKey: "updatedAt" },
          ]}
          pageSize={10}
          emptyMessage="No items found."
        />
      </div>
    </DashboardLayout>
  );
}
