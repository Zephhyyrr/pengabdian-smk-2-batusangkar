'use client';

import { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { apiRequest } from '@/services/api.service';
import axios from 'axios';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    // Handle ESC key to close modal
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
        }

        return () => {
            document.removeEventListener('keydown', handleEsc);
        };
    }, [isOpen, onClose]);

    // Handle click outside to close
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose();
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] bg-[rgba(0,0,0,0.5)] backdrop-blur-sm flex justify-center items-center"
            onClick={handleBackdropClick}
        >
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">Create Komoditas</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white focus:outline-none"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>
                <div className="p-4 text-gray-800 dark:text-gray-200">
                    {children}
                </div>
            </div>
        </div>
    );
};

interface InputKomoditasFormProps {
    isOpen: boolean;
    onClose: () => void;
    formMode?: "create" | "update";
    initialData?: any;
    onSubmitSuccess?: () => void;
}

export default function InputKomoditasForm({
    isOpen,
    onClose,
    formMode = "create",
    initialData,
    onSubmitSuccess,
}: InputKomoditasFormProps) {
    const [id_jenis, setIdJenis] = useState("");
    const [nama, setNama] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [foto, setFoto] = useState<File | null>(null);
    const [satuan, setSatuan] = useState("");
    const [jumlah, setJumlah] = useState("");
    const [loading, setLoading] = useState(false);

    const [jenisList, setJenisList] = useState<any[]>([]);

    const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtYSI6IlN1cGVyIEFkbWliIiwiZW1haWwiOiJzdXBlcmFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJzdXBlcl9hZG1pbiIsImlhdCI6MTc0OTcwNDMxNCwiZXhwIjoxNzUyMjk2MzE0fQ.gPsOkIEBS4bfKHEz-G_JgjEWOl9IU1dhL1U9Bl0TD94";

    useEffect(() => {
        fetchDataJenis();

        if (formMode === "update" && initialData) {
            setIdJenis(initialData.id_jenis?.toString() || "");
            setNama(initialData.nama || "");
            setDeskripsi(initialData.deskripsi || "");
            setSatuan(initialData.satuan || "");
            setJumlah(initialData.jumlah?.toString() || "");
        }
    }, [formMode, initialData]);

    const fetchDataJenis = async () => {
        try {
            const data = await apiRequest({
                endpoint: "/jenis",
                token,
            });
            setJenisList(Array.isArray(data) ? data : [data]);
        } catch (err) {
            console.error("Gagal ambil data jenis:", err);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("id_jenis", id_jenis.toString());
            formData.append("nama", nama);
            formData.append("deskripsi", deskripsi);
            formData.append("satuan", satuan);
            formData.append("jumlah", jumlah.toString());
            if (foto) {
                formData.append("foto", foto);
            }

            const endpoint =
                formMode === "create"
                    ? "/komoditas"
                    : `/komoditas/${initialData?.id}`;
            const method = formMode === "create" ? "POST" : "PUT";

            await apiRequest({
                endpoint,
                method,
                token,
                data: formData,
            });

            alert(
                `Komoditas berhasil ${formMode === "create" ? "ditambahkan" : "diperbarui"}`
            );
            if (onSubmitSuccess) onSubmitSuccess();
            onClose();
        } catch (err: any) {
            alert("Gagal menyimpan komoditas: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="p-4">
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-2 gap-4 text-gray-900 dark:text-gray-100"
                >
                    <div className="flex items-center gap-4">
                        <label>Jenis Komoditas</label>
                    </div>
                    <select
                        value={id_jenis}
                        onChange={(e) => setIdJenis(e.target.value)}
                        className="border rounded px-2 py-1 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full"
                        required
                    >
                        <option value="">Pilih Jenis Komoditas</option>
                        {jenisList.map((jenis) => (
                            <option key={jenis.id} value={jenis.id}>
                                {jenis.name}
                            </option>
                        ))}
                    </select>

                    <label>Nama</label>
                    <input
                        type="text"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        className="border rounded px-2 py-1 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                    />

                    <label>Deskripsi</label>
                    <textarea
                        value={deskripsi}
                        onChange={(e) => setDeskripsi(e.target.value)}
                        className="border rounded px-2 py-1 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-y"
                        rows={4}
                    />


                    <label>Satuan</label>
                    <input
                        type="text"
                        value={satuan}
                        onChange={(e) => setSatuan(e.target.value)}
                        className="border rounded px-2 py-1 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />

                    <label>Jumlah</label>
                    <input
                        type="number"
                        value={jumlah}
                        onChange={(e) => setJumlah(e.target.value)}
                        className="border rounded px-2 py-1 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />

                    <label>Upload Gambar</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            e.target.files && setFoto(e.target.files[0])
                        }
                        className="border rounded px-2 py-1 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />

                    <label>Preview</label>
                    {foto ? (
                        <img
                            src={URL.createObjectURL(foto)}
                            alt="Preview"
                            className="max-h-48 rounded border"
                        />
                    ) : initialData?.foto ? (
                        <img
                            src={initialData.foto}
                            alt="Preview"
                            className="max-h-48 rounded border"
                        />
                    ) : (
                        <p className="text-sm text-gray-500 dark:text-gray-300">
                            Belum ada gambar
                        </p>
                    )}
                    <div className="col-span-2 mt-4 flex justify-end space-x-2">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-200 dark:bg-gray-600 dark:text-white text-gray-800 rounded hover:bg-green-300 dark:hover:bg-green-500"
                            onClick={onClose}
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            {loading ? "Menyimpan..." : formMode === "create" ? "Submit" : "Update"}
                        </button>
                    </div>
                </form>

            </div>
        </Modal>
    );
}
