"use client";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/table/DataTable";
import CreateUpdateModal from "@/components/dashboard/CreateUpdateModal";
import { Pencil, Trash2 } from "lucide-react";
import { apiRequest } from "@/services/api.service";
import { Barang } from "@/types";

export default function DashboardBarang() {
  const [barang, setBarang] = useState<Barang[]>([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "update">("create");
  const [initialData, setInitialData] = useState<any>(null);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtYSI6IlN1cGVyIEFkbWliIiwiZW1haWwiOiJzdXBlcmFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJzdXBlcl9hZG1pbiIsImlhdCI6MTc0NzM5NzQ1NCwiZXhwIjoxNzQ5OTg5NDU0fQ.ky6khUQTS2z1SXPea-8j8yun-EtaRb-rAD6RuTSYPpA";

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

  const handleCreate = () => {
    setFormMode("create");
    setInitialData(null);
    setOpenCreate(true);
  };

  const handleUpdate = (id: number) => {
    const barangToEdit = barang.find((b) => b.id === id);
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
          endpoint: `/barang/${id}`,
          method: "DELETE",
          token: token,
        });
        console.log("kehapus bang");
        fetchData();
      } catch (error) {
        console.error("Error delete data:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DashboardLayout title="Barang" role="Admin">
      <div>
        <DataTable
          data={barang}
          _create={handleCreate}
          columns={[
            { header: "ID", accessorKey: "id" },
            { header: "Nama Barang", accessorKey: "nama" },
            { header: "Jumlah", accessorKey: "jumlah" },
            { header: "Satuan", accessorKey: "satuan" },
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
        title="Barang"
        fields={["nama", "satuan"]}
        endpoint="/barang"
        initialData={initialData}
      />
    </DashboardLayout>
  );
}