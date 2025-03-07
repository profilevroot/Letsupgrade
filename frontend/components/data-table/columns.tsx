"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Employee } from "@/constants/data";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<Employee>[] = [
  {
    header: "S.no",
    cell: ({ row }) => {
      return row?.index + 1;
    },
  },
  {
    accessorKey: "country",
    header: "Country name",
  },
  {
    accessorKey: "auto_trading",
    header: "Resume/Pause",
  },
  {
    accessorKey: "updated_by",
    header: "updated_by",
  },
  {
    accessorKey: "last_updated",
    header: "last_updated",
  },
  {
    accessorKey: "endpoint",
    header: "endpoint",
  },
];
