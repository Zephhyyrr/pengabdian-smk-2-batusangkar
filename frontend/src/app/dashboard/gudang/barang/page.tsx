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
      <div className="">
        <DataTable 
          data={barang}
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
    </DashboardLayout>
  );
}
