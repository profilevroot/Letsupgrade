"use client";
import { Checkbox } from "@/components/ui/checkbox"; 
import { TableRowActions } from "@/components/custom-table/table-row-actions";
import AddDialog from "./add-edit";

export const columns = ({actions,appUrl,apiUrl}) => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "username",
    header: "NAME",
  },
  {
    accessorKey: "country",
    header: "COUNTRY",
  },
  {
    accessorKey: "email",
    header: "EMAIL",
  },
  {
    accessorKey: "job",
    header: "COMPANY",
  },
  {
    accessorKey: "gender",
    header: "GENDER",
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
