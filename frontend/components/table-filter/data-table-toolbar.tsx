"use client";

import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export const status = [
  {
    value: 1,
    label: "Active",
  },
  {
    value: 0,
    label: "In-active",
  },
];
interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  toolbarData: any;
}

export function DataTableToolbar<TData>({
  table,
  toolbarData,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const { statusFilter, filterInput } = toolbarData;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {filterInput && (
          <Input
            placeholder={filterInput.label}
            value={
              (table
                .getColumn(filterInput.column)
                ?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table
                .getColumn(filterInput.column)
                ?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
        )}
        {statusFilter && table.getColumn(statusFilter.column) && (
          <DataTableFacetedFilter
            column={table.getColumn(statusFilter.column)}
            title={statusFilter.label}
            table={table}
            options={statusFilter.options}
          />
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
