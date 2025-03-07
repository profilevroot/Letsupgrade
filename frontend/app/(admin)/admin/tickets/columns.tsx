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
    accessorKey: "ticketNo",
    header: "Ticket No",
  },
  {
    accessorKey: "startDate",
    header: "Date",
  },
  {
    accessorKey: "category_id",
    header: "Category",
  },
  {
    accessorKey: "subject",
    header: "Subject",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "guidance",
    header: "Guidance",
  },
  {
    accessorKey: "labLink",
    header: "Lab Link",
  },
/*   {
    accessorKey: "role",
    header: "ROLE",
    cell: ({ row }) => {
      //console.log("row",row)
      return <SelectRole data={row.original} roles={extraData?.roles} />;
    },
  }, */
  {
    accessorKey: "Priority",
    header: "Priority",
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
