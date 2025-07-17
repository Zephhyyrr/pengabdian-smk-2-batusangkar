"use client";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/table/DataTable";
import { apiRequest } from "@/services/api.service";
import { getPenjualan, getKomoditas } from "@/services/dummy_api";
import { Penjualan, Komoditas } from "@/types";

export default function DashboardKepsek() {
  const [penjualan, setPenjualan] = useState<Penjualan[]>([]);
  const [komoditas, setKomoditas] = useState<Komoditas[]>([]);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtYSI6IlN1cGVyIEFkbWliIiwiZW1haWwiOiJzdXBlcmFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJzdXBlcl9hZG1pbiIsImlhdCI6MTc0NzM5NzQ1NCwiZXhwIjoxNzQ5OTg5NDU0fQ.ky6khUQTS2z1SXPea-8j8yun-EtaRb-rAD6RuTSYPpA";

  const fetchData = async () => {
    // const penj = await apiRequest({ endpoint: "/penjualan", token });
    // setPenjualan(penj);
    const penj = await getPenjualan();
    setPenjualan(penj);
    const komo = await getKomoditas();
    setKomoditas(komo);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DashboardLayout title="Dashboard" role="Kepala Sekolah">
      <div>
        <h2 className="text-lg font-bold">Penjualan</h2>
        <DataTable
          data={penjualan}
          columns={[
          {
            header: "Asal Produksi",
            accessorKey: "produksi",
            cell: (item: Penjualan) => item.produksi.asal_produksi.nama,
          },
          {
            header: "Kode Produksi",
            accessorKey: "produksi",
            cell: (item: Penjualan) => item.produksi.kode_produksi,
          },
          {
            header: "Komoditas",
            accessorKey: "komodity",
            cell: (item: Penjualan) => item.komodity.nama,
          },
          // {
          //   header: "Jenis Komoditas",
          //   accessorKey: "komodity",
          //   cell: (item: Penjualan) => item.komodity.jenis.name,
          // },
          {
            header: "Jumlah Terjual",
            accessorKey: "jumlah_terjual",
            cell: (item: Penjualan) => item.jumlah_terjual + " " + item.komodity.satuan,
          },
          {
            header: "Kualitas",
            accessorKey: "kualitas",
          },
          {
            header: "Tanggal",
            accessorKey: "createdAt",
            cell: (item: Penjualan) => new Date(item.createdAt).toLocaleString(),
          },
          { header: "Keterangan", accessorKey: "keterangan" },
            ]}
            pageSize={10}
            emptyMessage="No items found."
        />
      </div>
    </DashboardLayout>
  );
}
