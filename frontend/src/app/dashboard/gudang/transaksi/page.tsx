"use client";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/table/DataTable";
import CreateUpdateModal from "@/components/dashboard/CreateUpdateModal";
import { Pencil, Trash2 } from "lucide-react";
import { apiRequest } from "@/services/api.service";
import { TransaksiBarang, Barang } from "@/types";

export default function DashboardBarang() {
  const [transaksiBarang, setTransaksiBarang] = useState<TransaksiBarang[]>([]);
  const [barang, setBarang] = useState<Barang[]>([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "update">("create");
  const [initialData, setInitialData] = useState<any>(null);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtYSI6IlN1cGVyIEFkbWliIiwiZW1haWwiOiJzdXBlcmFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJzdXBlcl9hZG1pbiIsImlhdCI6MTc0NzM5NzQ1NCwiZXhwIjoxNzQ5OTg5NDU0fQ.ky6khUQTS2z1SXPea-8j8yun-EtaRb-rAD6RuTSYPpA";

  const fetchData = async () => {
    try {
      const data = await apiRequest({
        endpoint: "/transaksi-barang",
        token: token,
      });
      // const allTransaksi = [...data.barang_masuk, ...data.barang_keluar];

      // console.log("babi:", allTransaksi);
      
      setTransaksiBarang(data.barang_masuk);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchBarang = async () => {
    const data = await apiRequest({ endpoint: "/barang", token });
    setBarang(data);
  };

  const handleCreate = () => {
    setFormMode("create");
    setInitialData(null);
    setOpenCreate(true);
  };

  const handleUpdate = (id: number) => {
    const barangToEdit = transaksiBarang.find((b) => b.id === id);
    if (barangToEdit) {
      setFormMode("update");
      setInitialData(barangToEdit);
      setOpenCreate(true);
    }
  };

  const handleDelete = async (id: number) => {
    const sure = confirm("Delete nih, bang?");
    if (sure) {
      try {
        await apiRequest({
          endpoint: `/transaksi-barang/${id}`,
          method: "DELETE",
          token: token,
        });
        fetchData();
      } catch (error) {
        console.error("Error delete data:", error);
      }
    }
  };

  useEffect(() => {
    fetchBarang();
    fetchData();
  }, []);

  return (
    <DashboardLayout title="Transaksi Barang" role="Admin">
      <div>
        <h2 className="text-lg font-bold">Masuk</h2>
        <DataTable
          data={transaksiBarang}
          _create={handleCreate}
          columns={[
            { header: "ID", accessorKey: "id" },
            { 
              header: "Nama Barang", 
              accessorKey: "barang",
              cell: (item) => item.barang.nama
            },
            { 
              header: "Jumlah", 
              accessorKey: "masuk",
              cell: (item) => item.masuk
            },
            {
              header: "Tanggal Masuk",
              accessorKey: "createdAt",
              cell: (item) => new Date(item.createdAt).toLocaleString(),
            },
            {
              header: "Aksi",
              accessorKey: "createdAt",
              cell: (item) => (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(item.id)}
                    className="p-2 bg-yellow-600 text-white rounded"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 bg-red-600 text-white rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )

            },
          ]}
          pageSize={10}
          emptyMessage="No items found."
        />
      </div>

      <CreateUpdateModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onSuccess={() => {
          fetchData();
          setOpenCreate(false);
        }}
        token={token}
        mode={formMode}
        title="Transaksi Barang"
        fields={[
          {
            name: "id_barang",
            label: "Barang",
            type: "select",
            options: barang.map((b) => ({
              label: b.nama,
              value: b.id,
            })),
          },
          { name: "tanggal", type: "date" },
          { name: "masuk", type: "number" },
          { name: "keluar", type: "number" },
          { name: "keterangan", type: "text" },
        ]}
        endpoint="/transaksi-barang"
        initialData={initialData}
      />
    </DashboardLayout>
  );
}
