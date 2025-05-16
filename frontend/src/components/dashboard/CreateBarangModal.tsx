import { useState } from "react";
import { apiRequest } from "@/services/api.service";

export default function CreateBarangModal({ open, onClose, onCreated, token }: any) {
  const [nama, setNama] = useState("");
  const [satuan, setSatuan] = useState("");
  const [errors, setErrors] = useState<any>({});

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await apiRequest({
        endpoint: "/barang",
        method: "POST",
        token,
        data: { nama, satuan },
      });

      onCreated();
      onClose();
      setNama("");
      setSatuan("");
      setErrors({});
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

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Tambah Barang</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Nama Barang</label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full border rounded p-2 bg-gray-100 dark:bg-gray-900"
            />
            {errors.nama && <p className="text-red-500 text-sm">{errors.nama}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Satuan</label>
            <input
              type="text"
              value={satuan}
              onChange={(e) => setSatuan(e.target.value)}
              className="w-full border rounded p-2 bg-gray-100 dark:bg-gray-900"
            />
            {errors.satuan && <p className="text-red-500 text-sm">{errors.satuan}</p>}
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
