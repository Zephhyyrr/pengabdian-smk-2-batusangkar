"use client";
import React from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";

export default function Jenis_Komoditas() {
  return (
    <>
      {/* Search & Button */}
      <div className="flex justify-between items-center w-full mb-4">
        <form className="w-full max-w-md">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Here..."
              className="w-full rounded-lg border px-6 py-3 shadow focus:border-blue-500 focus:outline-none 
                         bg-white text-gray-900 dark:bg-gray-900 dark:text-white dark:border-gray-700"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              aria-label="search-icon"
            >
              <Search className="h-6 w-6" />
            </button>
          </div>
        </form>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 mt-6">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1100px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell isHeader className="dark:text-white">No</TableCell>
                  <TableCell isHeader className="dark:text-white">Nama</TableCell>
                  <TableCell isHeader className="dark:text-white">Action</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[1, 2, 3].map((i) => (
                  <TableRow key={i}>
                    <TableCell className="dark:text-gray-200">{i}</TableCell>
                    <TableCell className="dark:text-gray-200">Melon {i}</TableCell>
                    <TableCell>
                      <button className="bg-green-600 hover:bg-green-700 text-white hover:underline py-1 px-3 rounded">
                        Edit
                      </button>
                      <button className="ml-2 bg-red-600 text-white py-1 px-3 rounded hover:underline">
                        Hapus
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <nav aria-label="Page navigation" className="flex justify-center mt-6">
        <ul className="inline-flex -space-x-px text-sm">
          <li>
            <button className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white dark:bg-gray-900 dark:text-gray-300 border border-e-0 border-gray-300 dark:border-gray-700 rounded-s-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              Previous
            </button>
          </li>
          {[1, 2, 3].map((p) => (
            <li key={p}>
              <button
                className={`flex items-center justify-center px-3 h-8 leading-tight border ${
                  p === 1
                    ? "text-blue-600 border-gray-300 bg-blue-50 dark:bg-blue-900 dark:border-gray-700"
                    : "text-gray-500 bg-white dark:bg-gray-900 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700"
                }`}
              >
                {p}
              </button>
            </li>
          ))}
          <li>
            <button className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white dark:bg-gray-900 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-e-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              Next
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
