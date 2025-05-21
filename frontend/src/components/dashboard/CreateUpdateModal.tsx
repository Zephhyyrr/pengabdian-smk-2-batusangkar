import { useState, useEffect } from "react";
import { apiRequest } from "@/services/api.service";

interface ModalFormProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  token: string;
  mode: "create" | "update";
  title: string;
  fields: string[];
  endpoint: string;
  initialData?: Record<string, any>;
}

export default function ModalForm({
  open,
  onClose,
  onSuccess,
  token,
  mode,
  title,
  fields,
  endpoint,
  initialData,
}: ModalFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (mode === "update" && initialData) {
      setFormData(initialData);
    } else {
      const emptyData: any = {};
      fields.forEach((field) => (emptyData[field] = ""));
      setFormData(emptyData);
    }
    setErrors({});
  }, [open, mode, initialData, fields]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await apiRequest({
        endpoint: mode === "create" ? endpoint : `${endpoint}/${initialData?.id}`,
        method: mode === "create" ? "POST" : "PUT",
        token,
        data: formData,
      });

      onSuccess();
      onClose();
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
        <h2 className="text-lg font-bold mb-4">
          {mode === "create" ? `Tambah ${title}` : `Edit ${title}`}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium capitalize">{field}</label>
              <input
                type="text"
                value={formData[field] || ""}
                onChange={(e) => handleChange(field, e.target.value)}
                className="w-full border rounded p-2 bg-gray-100 dark:bg-gray-900"
              />
              {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
            </div>
          ))}
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
              {mode === "create" ? "Simpan" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
