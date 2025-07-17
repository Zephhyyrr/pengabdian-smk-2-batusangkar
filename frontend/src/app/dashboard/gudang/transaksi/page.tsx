"use client";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/table/DataTable";
import { Pencil, Trash2, Upload, Download } from "lucide-react";
import { apiRequest } from "@/services/api.service";
import { TransaksiBarang, Barang } from "@/types";
import ConfirmButton from "@/components/common/ConfirmButton";

export default function DashboardBarang() {
  const [barangMasuk, setBarangMasuk] = useState<TransaksiBarang[]>([]);
  const [barangKeluar, setBarangKeluar] = useState<TransaksiBarang[]>([]);
  const [barang, setBarang] = useState<Barang[]>([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "update">("create");
  const [initialData, setInitialData] = useState<any>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // State untuk modal form
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<any>({});

  const fetchData = async () => {
    try {
      const data = await apiRequest({ endpoint: "/transaksi-barang" });
      setBarangMasuk(data.barang_masuk);
      setBarangKeluar(data.barang_keluar);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const fetchBarang = async () => {
    try {
      const data = await apiRequest({ endpoint: "/barang" });
      setBarang(data.barang);
    } catch (error) {
      console.error("Error fetching barang:", error);
    }
  };

  const handleUpdate = (barangToEdit: TransaksiBarang) => {
    if (barangToEdit) {
      setFormMode("update");
      setInitialData(barangToEdit);
      setOpenCreate(true);
    }
  };

  const handleDelete = (trans: TransaksiBarang) => {
    const id = trans.id
    setDeleteId(id);
    setShowConfirm(true);
  };

  const deleteData = async () => {
    if (deleteId !== null) {
      await apiRequest({
        endpoint: `/transaksi-barang/${deleteId}`,
        method: "DELETE",
      });
      fetchData();
      setShowConfirm(false);
      setDeleteId(null);
    }
  };

  // Handle modal form
  useEffect(() => {
    if (openCreate) {
      if (formMode === "update" && initialData) {
        setFormData(initialData);
      } else {
        const emptyData: any = {};
        const fields = [
          { name: "id_barang", type: "select" },
          { name: "tanggal", type: "date" },
          { name: "masuk", type: "number" },
          { name: "keluar", type: "number" },
          { name: "keterangan", type: "text" },
        ];
        fields.forEach((field) => (emptyData[field.name] = ""));
        setFormData(emptyData);
      }
      setErrors({});
    }
  }, [openCreate, formMode, initialData]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await apiRequest({
        endpoint:
          formMode === "create" ? "/transaksi-barang" : `/transaksi-barang/${initialData?.id}`,
        method: formMode === "create" ? "POST" : "PUT",
        data: formData,
      });

      fetchData();
      setOpenCreate(false);
    } catch (error: any) {
      console.error(error);
      if (error.response?.data?.errors) {
        const newErrors: any = {};
        error.response.data.errors.forEach((err: any) => {
          newErrors[err.path] = err.msg;
        });
        setErrors(newErrors);
      }
    }
  };

  const addBarangMasuk = () => {
    setFormMode("create");
    setOpenCreate(true);
  };
  
  const addBarangKeluar = () => {
    setFormMode("create");
    setOpenCreate(true);
  };

  useEffect(() => {
    fetchBarang();
    fetchData();
  }, []);

  // Field configuration - moved inside component to ensure barang is loaded
  const fields = [
    {
      name: "id_barang",
      label: "Barang",
      type: "select" as const,
      options: barang ? barang.map((b) => ({
        label: b.nama,
        value: b.id,
      })) : [],
    },
    { name: "tanggal", type: "date" as const },
    { name: "jumlah", type: "number" as const },
    { name: "keterangan", type: "text" as const },
  ];

  return (
    <DashboardLayout title="Transaksi Barang |" role="Admin">
      <div>
        <h2 className="text-lg font-bold">Masuk</h2>
        <DataTable
          data={barangMasuk}
          _create={addBarangMasuk}
          columns={[
            {
              header: "#",
              accessorKey: "id",
              cell: (item) => barangMasuk.findIndex((p) => p.id === item.id) + 1,
            },
            {
              header: "Nama Barang",
              accessorKey: "nama",
              cell: (item) => item.nama,
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
                    onClick={() => handleUpdate(item)}
                    className="p-2 bg-yellow-500 hover:bg-yellow-400 text-white rounded">
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="p-2 bg-red-600 hover:bg-red-500 text-white rounded">
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
      <div>
        <h2 className="text-lg font-bold">Keluar</h2>
        <DataTable
          data={barangKeluar}
          _create={addBarangKeluar}
          columns={[
            {
              header: "#",
              accessorKey: "id",
              cell: (item) => barangKeluar.findIndex((p) => p.id === item.id) + 1,
            },
            {
              header: "Nama Barang",
              accessorKey: "nama",
              cell: (item) => item.nama,
            },
            {
              header: "Jumlah",
              accessorKey: "keluar",
              cell: (item) => item.keluar,
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
                    onClick={() => handleUpdate(item)}
                    className="p-2 bg-yellow-500 hover:bg-yellow-400 text-white rounded">
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="p-2 bg-red-600 hover:bg-red-500 text-white rounded">
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

      {openCreate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">
              {formMode === "create" ? "Tambah Transaksi Barang" : "Edit Transaksi Barang"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {fields.map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium capitalize">
                    {field.label || field.name}
                  </label>

                  {field.type === "select" ? (
                    <select
                      value={formData[field.name] || ""}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      className="w-full border rounded p-2">
                      <option value="">Pilih {field.label || field.name}</option>
                      {field.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      value={formData[field.name] || ""}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      className="w-full border rounded p-2"
                    />
                  )}

                  {errors[field.name] && (
                    <p className="text-red-500 text-sm">{errors[field.name]}</p>
                  )}
                </div>
              ))}

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setOpenCreate(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded">
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded">
                  {formMode === "create" ? "Simpan" : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
