import { useState } from "react";

interface DataTableProps<T> {
  data: T[];
  columns: {
    header: string;
    accessorKey: keyof T;
    cell?: (item: T) => React.ReactNode;
  }[];
  pageSize?: number;
  emptyMessage?: string;
}

export function DataTable<T>({
  data,
  columns,
  pageSize = 10,
  emptyMessage = "No items found.",
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = data.filter((item: any) =>
    Object.values(item).some((value: any) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const totalItems = filteredData.length;

  return (
    <>
      <div className="flex mb-4 gap-2">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full max-w-xs"
        />
      </div>

      <div className="overflow-x-auto border rounded">
        <table className="table-auto w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col, i) => (
                <th key={i} className="p-3 border-b">{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center p-6 text-gray-500">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              filteredData
                .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                .map((item, rowIdx) => (
                  <tr key={rowIdx} className="border-b hover:bg-gray-50">
                    {columns.map((col, colIdx) => (
                      <td key={colIdx} className="p-3">
                        {col.cell ? col.cell(item) : (item[col.accessorKey] as React.ReactNode)}
                      </td>
                    ))}
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <p>
          Showing {Math.min((currentPage - 1) * pageSize + 1, totalItems)} to{" "}
          {Math.min(currentPage * pageSize, totalItems)} of {totalItems}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
