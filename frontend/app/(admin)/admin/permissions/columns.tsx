"use client";
import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/constants/data";
import { Checkbox } from "@/components/ui/checkbox";
import { CellAction } from "@/components/table-cell-action/cell-action";
import AddDialog from "./add-edit";

export const columns: ColumnDef<User>[] = [
  {
    header: "S.no",
    cell: ({ row }) => {
      return row?.index + 1;
    },
  },
  {
    accessorKey: "name",
    header: "Permission name",
  },
  {
    header: "Action",
    id: "actions",
    cell: ({ row }) => (
      <CellAction
        data={row.original}
        AddEditPopup={AddDialog}
        deleteUrl="/route/"
        label="Route"
      />
    ),
  },
];
