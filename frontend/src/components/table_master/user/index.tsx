import { ColumnDef, Column, Row } from "@tanstack/react-table";
import { User } from "@/types";
import { Button } from "@/components/landing/ui/button";
import { ArrowUpDown } from "lucide-react";

interface UserTableActionsProps {
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

export const createColumns = ({ onEdit, onDelete }: UserTableActionsProps): ColumnDef<User>[] => [
  {
    accessorKey: "nama",
    header: ({ column }: { column: Column<User> }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nama
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }: { row: Row<User> }) => {
      const user = row.original;
      return (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(user)}>
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(user.id)}
          >
            Hapus
          </Button>
        </div>
      );
    },
  },
];