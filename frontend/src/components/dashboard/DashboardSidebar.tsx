"use client";
import {
  Menu,
  ChevronDown,
  BadgeCent,
  LayoutDashboard,
  Boxes,
  Tractor,
  Warehouse,
  Users,
} from "lucide-react";

import { useState } from "react";

export default function DashboardSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        type="button"
        className="inline-flex p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <span className="sr-only">Open sidebar</span>
        <Menu className="w-6 h-6" />
      </button>

      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen bg-gray-800 transition-transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}>
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {/* Kepsek */}
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <LayoutDashboard className="w-5 h-5" />
                <span className="ms-3">Kepala Sekolah</span>
              </a>
            </li>
            
            {/* Penjualan */}
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <BadgeCent className="w-5 h-5" />
                <span className="ms-3">Penjualan</span>
              </a>
            </li>

            {/* Komoditas */}
            <li className="relative">
              <input type="checkbox" id="dropdown-komoditas" className="peer hidden" />
              <label
                htmlFor="dropdown-komoditas"
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 cursor-pointer">
                <Tractor className="w-5 h-5" />
                <span className="flex-1 ms-3 text-left whitespace-nowrap">Komoditas</span>
                <ChevronDown className="w-4 h-4 peer-checked:rotate-180 transition" />
              </label>

              <ul className="max-h-0 overflow-hidden transition-all duration-300 peer-checked:max-h-40 peer-checked:opacity-100 opacity-0 py-0 peer-checked:py-2 space-y-2">
                <li>
                  <a
                    href="#"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                    Daftar Komoditas
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                    Jenis Komoditas
                  </a>
                </li>
              </ul>
            </li>

            {/* Produksi */}
            <li className="relative">
              <input type="checkbox" id="dropdown-produksi" className="peer hidden" />
              <label
                htmlFor="dropdown-produksi"
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 cursor-pointer">
                <Warehouse className="w-5 h-5" />
                <span className="flex-1 ms-3 text-left whitespace-nowrap">Produksi</span>
                <ChevronDown className="w-4 h-4 peer-checked:rotate-180 transition" />
              </label>

              <ul className="max-h-0 overflow-hidden transition-all duration-300 peer-checked:max-h-40 peer-checked:opacity-100 opacity-0 py-0 peer-checked:py-2 space-y-2">
                <li>
                  <a
                    href="#"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                    Daftar Produksi
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                    Asal Produksi
                  </a>
                </li>
              </ul>
            </li>

            {/* Gudang */}
            <li className="relative">
              <input type="checkbox" id="dropdown-gudang" className="peer hidden" />
              <label
                htmlFor="dropdown-gudang"
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 cursor-pointer">
                <Boxes className="w-5 h-5" />
                <span className="flex-1 ms-3 text-left whitespace-nowrap">Barang</span>
                <ChevronDown className="w-4 h-4 peer-checked:rotate-180 transition" />
              </label>

              <ul className="max-h-0 overflow-hidden transition-all duration-300 peer-checked:max-h-40 peer-checked:opacity-100 opacity-0 py-0 peer-checked:py-2 space-y-2">
                <li>
                  <a
                    href="#"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                    Daftar Barang
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                    Transaksi
                  </a>
                </li>
              </ul>
            </li>

            {/* Manajemen User */}
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <Users className="w-5 h-5" />
                <span className="flex-1 ms-3 whitespace-nowrap">Admin</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"></div>
      )}
    </>
  );
}
