"use client";
import PopupDialog from "./popup";
import { TableRowActions } from "@/components/custom-table/table-row-actions";

export const columns = ({actions, appUrl, apiUrl, sno}) => [
  {
    header: "S.no",
    cell: ({ row }) => {
      return row?.index + sno + 1;
    },
  },
  {
    accessorKey: "name",
    header: "Role name",
  },
  {
    accessorKey: "status",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
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
        AddEditPopup={PopupDialog}
      />
    ),
  },
];
