"use client";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/table/DataTable";
import { getTransaksiBarang } from "@/services/dummy_api";
import { TransaksiBarang } from "@/types";

export default function DashboardTransaksi() {
  const [transaksiBarang, setTransaksiBarang] = useState<TransaksiBarang[]>([]);

  useEffect(() => {
    getTransaksiBarang().then((data) => setTransaksiBarang(data));
  }, []);

  return (
    <DashboardLayout title="Transaksi Barang">
      <div className="">
        <DataTable
          data={transaksiBarang}
          columns={[
            { header: "ID", accessorKey: "id" },
            { header: "ID Barang", accessorKey: "id_barang" },
            { header: "Tanggal", accessorKey: "tanggal" },
            { header: "Masuk", accessorKey: "masuk" },
            { header: "Keluar", accessorKey: "keluar" },
            { header: "Keterangan", accessorKey: "keterangan" },
            { header: "Created At", accessorKey: "createdAt" },
            { header: "Updated At", accessorKey: "updatedAt" },
          ]}
          pageSize={10}
          emptyMessage="No items found."
        />
      </div>
    </DashboardLayout>
  );
}
