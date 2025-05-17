'use client';

import { useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface InputPenjualanFormProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function InputPenjualanForm({ isOpen, onClose }: InputPenjualanFormProps) {
    // ESC untuk menutup modal
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
        }
        return () => {
            document.removeEventListener('keydown', handleEsc);
        };
    }, [isOpen, onClose]);

    // Klik di luar konten
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose();
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] bg-[rgba(0,0,0,0.5)] backdrop-blur-sm flex justify-center items-center"
            onClick={handleBackdropClick}
        >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Create Penjualan</h3>
                    <button
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white focus:outline-none"
                        onClick={onClose}
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>
                <div className="p-4">
                    <form className="grid grid-cols-1 gap-4 text-gray-900 dark:text-gray-100">
                        <div className="grid grid-cols-2 items-center gap-4">
                            <label>Jenis Komoditas</label>
                            <select className="border rounded px-2 py-1 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                <option value="">Pilih Jenis Komoditas</option>
                                <option value="melon">Melon</option>
                                <option value="ayam">Ayam</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-4">
                            <label>Ukuran</label>
                            <input
                                type="text"
                                className="border rounded px-2 py-1 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="Ukuran: M, L, XL"
                            />
                        </div>
                        <div className="grid grid-cols-2 items-center gap-4">
                            <label>Jumlah Terjual</label>
                            <input
                                type="number"
                                className="border rounded px-2 py-1 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="Jumlah Terjual"
                            />
                        </div>
                        <div className="grid grid-cols-2 items-center gap-4">
                            <label>Kualitas</label>
                            <input
                                type="text"
                                className="border rounded px-2 py-1 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="Kualitas: Premium, Medium, Outspare"
                            />
                        </div>
                        <div className="grid grid-cols-2 items-center gap-4">
                            <label>Asal Produksi</label>
                            <select className="border rounded px-2 py-1 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                <option value="">Pilih Asal Produksi</option>
                                <option value="Lapangan 1">Lapangan 1</option>
                                <option value="Lapangan 2">Lapangan 2</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-4">
                            <label>Keterangan</label>
                            <input
                                type="text"
                                className="border rounded px-2 py-1 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="Keterangan ..."
                            />
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                type="button"
                                className="px-4 py-2 bg-gray-200 dark:bg-gray-600 dark:text-white text-gray-800 rounded hover:bg-green-300 dark:hover:bg-green-500"
                                onClick={onClose}
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                onClick={() => console.log("Submit placeholder")}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
