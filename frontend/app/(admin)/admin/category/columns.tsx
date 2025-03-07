"use client";
import { TableRowActions } from "@/components/custom-table/table-row-actions";
import AddDialog from "./add-edit";

export const columns = ({ actions, appUrl, apiUrl, sno }) => [
  {
    header: "S.no",
    cell: ({ row }) => {
      return row?.index + sno + 1;
    },
  },
  {
    accessorKey: "name",
    header: "Action name",
  },
  {
    header: "Action",
    id: "actions",
    cell: ({ row }) => (
      <TableRowActions
        data={row.original}
        actions={actions}
        appUrl={appUrl}
        apiUrl={apiUrl}
        AddEditPopup={AddDialog}
      />
    ),
  },
];
