import { useState } from "react";
import * as XLSX from "xlsx-js-style";

interface ExportPenjualanModalProps {
    penjualanList: any[];
    onClose: () => void;
    isOpen: boolean;
}

export default function ExportPenjualanModal({ penjualanList, onClose, isOpen }: ExportPenjualanModalProps) {
    const [selectedMonth, setSelectedMonth] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleExport = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log("Selected Month:", selectedMonth);

        if (!selectedMonth) {
            alert("Silakan pilih bulan terlebih dahulu.");
            return;
        }

        if (!Array.isArray(penjualanList)) {
            alert("Data penjualan tidak tersedia.");
            return;
        }

        setLoading(true);

        try {
            const filteredData = penjualanList.filter((item) => {
                const date = new Date(item.createdAt);
                const monthString = date.toISOString().slice(0, 7);
                return monthString === selectedMonth;
            });

            if (filteredData.length === 0) {
                alert("Tidak ada data penjualan pada bulan ini.");
                setLoading(false);
                return;
            }

            const excelData = filteredData.map((item, index) => ({
                No: index + 1,
                "Tanggal": new Date(item.createdAt).toLocaleDateString("id-ID"),
                "Bulan": new Date(item.createdAt).toLocaleString("default", { month: "short" }),
                "Asal Kebun": item?.produksi?.asal_produksi?.nama || "-",
                "Kode Produksi": item?.produksi?.kode_produksi || "-",
                Komoditas: item?.komoditas?.nama || "-",
                Jenis: item?.komoditas?.jenis?.name || "-",
                Ukuran: item?.produksi?.ukuran || "-",
                "Jumlah Terjual": item?.jumlah_terjual ?? 0,
                Kualitas: item?.produksi?.kualitas || "-",
                Produksi: item?.produksi?.asal_produksi?.nama || "-",
                Keterangan: item?.keterangan || "-",
            }));

            const worksheet = XLSX.utils.json_to_sheet(excelData);
            const range = XLSX.utils.decode_range(worksheet["!ref"]!);

            for (let R = range.s.r; R <= range.e.r; ++R) {
                for (let C = range.s.c; C <= range.e.c; ++C) {
                    const cell_address = { r: R, c: C };
                    const cell_ref = XLSX.utils.encode_cell(cell_address);

                    if (!worksheet[cell_ref]) continue;

                    const isHeader = R === 0;
                    const isNoColumn = C === 0;

                    worksheet[cell_ref].s = {
                        border: {
                            top: { style: "thin", color: { rgb: "000000" } },
                            bottom: { style: "thin", color: { rgb: "000000" } },
                            left: { style: "thin", color: { rgb: "000000" } },
                            right: { style: "thin", color: { rgb: "000000" } },
                        },
                        alignment: {
                            vertical: "center",
                            horizontal: isHeader || isNoColumn ? "center" : "left", // center hanya untuk header & kolom No
                            wrapText: true,
                        },
                        fill: isHeader
                            ? { fgColor: { rgb: "4C9900" } }
                            : undefined,
                        font: {
                            name: "Arial",
                            sz: 11,
                            bold: isHeader,
                            color: { rgb: "000000" }, // font header hitam
                        },
                    };
                }
            }

            // Mengatur lebar kolom otomatis
            const colWidths = (Object.keys(excelData[0]) as (keyof typeof excelData[0])[]).map((key) => {
                const maxLength = Math.max(
                    String(key).length,
                    ...excelData.map((item) =>
                        String(item[key] ?? "").length
                    )
                );
                return { wch: maxLength + 2 };
            });

            worksheet['!cols'] = colWidths;

            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Penjualan");

            XLSX.writeFile(workbook, `Laporan-Penjualan-${selectedMonth}.xlsx`);
            onClose();
        } catch (err) {
            console.error("Gagal mengekspor data:", err);
            alert("Terjadi kesalahan saat mengekspor data.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[9999] bg-[rgba(0,0,0,0.5)] backdrop-blur-sm flex justify-center items-center">
            <div className="bg-white rounded-xl p-6 w-96 shadow-xl">
                <h2 className="text-lg font-semibold mb-4">Export Laporan Penjualan</h2>
                <form onSubmit={handleExport} className="space-y-4">
                    <label className="block text-sm mb-1 text-gray-700 dark:text-gray-200">
                        Pilih Bulan
                    </label>
                    <input
                        type="month"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="w-full p-2 border rounded-md dark:bg-gray-900 dark:text-white"
                    />

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            className="bg-gray-300 px-4 py-2 rounded"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-green-600 text-white px-4 py-2 rounded"
                        >
                            {loading ? "Mengekspor..." : "Export"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
