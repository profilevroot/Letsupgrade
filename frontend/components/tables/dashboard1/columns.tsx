"use client";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { dashboard1 } from "@/constants/data";
import { Checkbox } from "@/components/ui/checkbox";
const columnHelper = createColumnHelper<dashboard1>();
/* const columns = [
  columnHelper.group({
    id: 'hello',
    header: () => <span>Hello</span>,
    // footer: props => props.column.id,
    columns: [
      columnHelper.accessor('firstName', {
        cell: info => info.getValue(),
        footer: props => props.column.id,
      }),
      columnHelper.accessor(row => row.lastName, {
        id: 'lastName',
        cell: info => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: props => props.column.id,
      }),
    ],
  }),
  columnHelper.group({
    header: 'Info',
    footer: props => props.column.id,
    columns: [
      columnHelper.accessor('age', {
        header: () => 'Age',
        footer: props => props.column.id,
      }),
      columnHelper.group({
        header: 'More Info',
        columns: [
          columnHelper.accessor('visits', {
            header: () => <span>Visits</span>,
            footer: props => props.column.id,
          }),
          columnHelper.accessor('status', {
            header: 'Status',
            footer: props => props.column.id,
          }),
          columnHelper.accessor('progress', {
            header: 'Profile Progress',
            footer: props => props.column.id,
          }),
        ],
      }),
    ],
  }),
] */

export const columns: ColumnDef<dashboard1>[] = [
  columnHelper.group({
    header: "NL",
    columns: [
      columnHelper.accessor("nlb", {
        header: () => <span>NLB</span>,
      }),
      columnHelper.accessor("nldb", {
        header: () => <span>NLDB</span>,
      }),
    ],
  }),
  columnHelper.group({
    header: "BE",
    columns: [
      columnHelper.accessor("beb", {
        header: () => <span>BEB</span>,
      }),
      columnHelper.accessor("bedb", {
        header: () => <span>BEDB</span>,
      }),
    ],
  }),
  columnHelper.group({
    header: "DE",
    columns: [
      columnHelper.accessor("deb", {
        header: () => <span>DEB</span>,
      }),
      columnHelper.accessor("dedb", {
        header: () => <span>DEDB</span>,
      }),
    ],
  }),
  {
    accessorKey: "year",
    header: "Year",
  },
  {
    accessorKey: "sumb",
    header: "Sumb",
  },
  {
    accessorKey: "sumdb",
    header: "Sumdb",
  },
  {
    accessorKey: "sumb",
    header: "Sumb",
  },
  {
    accessorKey: "alldb",
    header: "alldb",
  },
];
