"use client";
import { TableRowActions } from "@/components/custom-table/table-row-actions";
import AddDialog from "./add-edit";
import { SelectRole } from "./cell-role";

export const columns = ({ actions, appUrl, apiUrl, sno, extraData }) => [
  {
    header: "S.no",
    cell: ({ row }) => {
      return row?.index + sno + 1;
    },
  },
  {
    accessorKey: "username",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "E-mail",
  },
  {
    accessorKey: "role",
    header: "ROLE",
    cell: ({ row }) => {
      //console.log("row",row)
      return <SelectRole data={row.original} roles={extraData?.roles} />;
    },
  },
  {
    accessorKey: "status",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    cell: ({ row }) => {
      //console.log("row",row)
      return row.original.status === 1 ? "Active" : "Inactive";
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <TableRowActions
        data={row.original}
        actions={actions}
        appUrl={appUrl}
        apiUrl={apiUrl}
        AddEditPopup={AddDialog}
        extraData={extraData}
      />
    ),
  },
];
