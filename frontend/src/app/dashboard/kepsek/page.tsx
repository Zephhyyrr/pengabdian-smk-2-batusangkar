"use client";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/table/DataTable";
import { apiRequest } from "@/services/api.service";
import { Penjualan, Komoditas } from "@/types";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  LineChart,
  Line
} from "recharts";

// Komponen Card untuk statistik
const StatCard = ({ title, value, subtitle, color = "blue" }: {
  title: string;
  value: string | number;
  subtitle?: string;
  color?: "blue" | "green" | "yellow" | "red";
}) => {
  const colorClasses = {
    blue: "bg-blue-50 border-blue-200 text-blue-800",
    green: "bg-green-50 border-green-200 text-green-800",
    yellow: "bg-yellow-50 border-yellow-200 text-yellow-800",
    red: "bg-red-50 border-red-200 text-red-800",
  };

  return (
    <div className={`rounded-lg border-2 p-4 ${colorClasses[color]}`}>
      <h3 className="text-sm font-medium opacity-80">{title}</h3>
      <p className="text-2xl font-bold mt-1">{value}</p>
      {subtitle && <p className="text-xs mt-1 opacity-70">{subtitle}</p>}
    </div>
  );
};

export default function DashboardKepsek() {
  const [penjualan, setPenjualan] = useState<Penjualan[]>([]);
  const [komoditas, setKomoditas] = useState<Komoditas[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const penj = await apiRequest({ endpoint: "/penjualan" });
      setPenjualan(penj);
      const komo = await apiRequest({ endpoint: "/komoditas" });
      setKomoditas(komo);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Hitung statistik untuk overview
  const totalPenjualan = penjualan.length;
  const totalKomoditas = komoditas.length;
  const komoditasAktif = komoditas.filter(k => k.jumlah > 0).length;

  // Data penjualan terbaru (5 teratas)
  const penjualanTerbaru = penjualan
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  // Data untuk grafik distribusi per jenis komoditas
  const distribusiJenis = komoditas.reduce((acc, item) => {
    const jenisNama = item.jenis.name;
    if (!acc[jenisNama]) {
      acc[jenisNama] = 0;
    }
    acc[jenisNama] += 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(distribusiJenis).map(([name, value]) => ({
    name,
    value,
  }));

  // Data untuk grafik komoditas terlaris
  const komoditasTerlaris = penjualan
    .reduce((acc, item) => {
      const nama = item.komoditas?.nama ?? "Tidak diketahui";
      if (!acc[nama]) {
        acc[nama] = 0;
      }
      acc[nama] += 1;
      return acc;
    }, {} as Record<string, number>);

  const barData = Object.entries(komoditasTerlaris)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name, value]) => ({
      name: name.length > 15 ? name.substring(0, 15) + '...' : name,
      fullName: name,
      transaksi: value,
    }));

  // Data untuk grafik trend penjualan (7 hari terakhir)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  const trendData = last7Days.map(date => {
    const dayPenjualan = penjualan.filter(p => 
      p.createdAt.split('T')[0] === date
    ).length;
    
    return {
      date: new Date(date).toLocaleDateString('id-ID', { 
        day: 'numeric', 
        month: 'short' 
      }),
      transaksi: dayPenjualan,
    };
  });

  // Warna untuk grafik
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  if (loading) {
    return (
      <DashboardLayout title="Dashboard" role="Kepala Sekolah">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Dashboard" role="Kepala Sekolah">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Selamat Datang, Kepala Sekolah
          </h1>
          <p className="text-gray-600">
            Ringkasan aktivitas program pertanian sekolah hari ini
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="Total Penjualan"
            value={totalPenjualan}
            subtitle="Transaksi"
            color="blue"
          />
          <StatCard
            title="Total Komoditas"
            value={totalKomoditas}
            subtitle="Jenis produk"
            color="green"
          />
          <StatCard
            title="Komoditas Aktif"
            value={komoditasAktif}
            subtitle="Tersedia stok"
            color="yellow"
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-6">
          {/* Penjualan Terbaru */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-800">
                Penjualan Terbaru
              </h2>
              <p className="text-sm text-gray-600">5 transaksi terakhir</p>
            </div>
            <div className="p-6">
              <DataTable
                data={penjualanTerbaru}
                columns={[
                  {
                    header: "Komoditas",
                    accessorKey: "komoditas",
                    cell: (item: Penjualan) => item.komoditas?.nama,
                  },
                  {
                    header: "Jumlah",
                    accessorKey: "jumlah_terjual",
                    cell: (item: Penjualan) => 
                      `${item.jumlah_terjual} ${item.komoditas?.satuan}`,
                  },
                  {
                    header: "Tanggal",
                    accessorKey: "createdAt",
                    cell: (item: Penjualan) => 
                      new Date(item.createdAt).toLocaleDateString('id-ID'),
                  },
                ]}
                emptyMessage="Belum ada penjualan"
              />
            </div>
          </div>
        </div>

        {/* Grafik Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Distribusi Jenis Komoditas */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-800">
                Distribusi Jenis Komoditas
              </h2>
              <p className="text-sm text-gray-600">Berdasarkan kategori</p>
            </div>
            <div className="p-6">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${percent !== undefined ? (percent * 100).toFixed(0) : "0"}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Komoditas Terlaris */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-800">
                Komoditas Terlaris
              </h2>
              <p className="text-sm text-gray-600">Top 5 berdasarkan transaksi</p>
            </div>
            <div className="p-6">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name, props) => [
                      `${value} transaksi`,
                      'Jumlah Transaksi'
                    ]}
                    labelFormatter={(label) => {
                      const item = barData.find(d => d.name === label);
                      return item ? item.fullName : label;
                    }}
                  />
                  <Bar dataKey="transaksi" fill="#0088FE" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Trend Penjualan */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-800">
                Trend Penjualan
              </h2>
              <p className="text-sm text-gray-600">7 hari terakhir</p>
            </div>
            <div className="p-6">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} transaksi`, 'Jumlah Transaksi']} />
                  <Line 
                    type="monotone" 
                    dataKey="transaksi" 
                    stroke="#00C49F" 
                    strokeWidth={2}
                    dot={{ fill: '#00C49F' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
