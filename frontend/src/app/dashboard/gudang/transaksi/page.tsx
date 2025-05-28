"use client";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/table/DataTable";
import CreateUpdateModal from "@/components/dashboard/CreateUpdateModal";
import { Pencil, Trash2 } from "lucide-react";
import { apiRequest } from "@/services/api.service";
import { TransaksiBarang, Barang } from "@/types";
import ConfirmButton from "@/components/common/ConfirmButton";

export default function DashboardBarang() {
  const [transaksiBarang, setTransaksiBarang] = useState<TransaksiBarang[]>([]);
  const [barang, setBarang] = useState<Barang[]>([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "update">("create");
  const [initialData, setInitialData] = useState<any>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

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

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const deleteData = async () => {
    if (deleteId !== null) {
      await apiRequest({
        endpoint: `/transaksi-barang/${deleteId}`,
        method: "DELETE",
        token: token,
      });
      fetchData();
      setShowConfirm(false);
      setDeleteId(null);
    }
  };

  useEffect(() => {
    fetchBarang();
    fetchData();
  }, []);

  return (
    <DashboardLayout title="Transaksi Barang |" role="Admin">
      <div>
        <h2 className="text-lg font-bold">Masuk</h2>
        <DataTable
          data={transaksiBarang}
          _create={handleCreate}
          columns={[
            {
              header: "#",
              accessorKey: "id",
              cell: (item) => transaksiBarang.findIndex((p) => p.id === item.id) + 1,
            },
            {
              header: "Nama Barang",
              accessorKey: "barang",
              cell: (item) => item.barang.nama,
            },
            {
              header: "Jumlah",
              accessorKey: "masuk",
              cell: (item) => item.masuk,
            },
            {
              header: "Tanggal",
              accessorKey: "createdAt",
              cell: (item) => new Date(item.createdAt).toLocaleString(),
            },
            { header: "Keterangan", accessorKey: "keterangan" },
            {
              header: "Aksi",
              accessorKey: "createdAt",
              cell: (item) => (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(item.id)}
                    className="p-2 bg-yellow-600 text-white rounded">
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 bg-red-600 text-white rounded">
                    <Trash2 size={16} />
                  </button>
                </div>
              ),
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

      {showConfirm && (
        <ConfirmButton
          message="Yakin hapus data ini?"
          onConfirm={deleteData}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </DashboardLayout>
  );
}
