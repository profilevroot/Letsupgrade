"use client";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { User } from "@/constants/data";

import { checkActionPermission } from "@/lib/utils";
import { PermissionContext } from "./action-context";

interface ProductsClientProps {
  data: User[];
  actions: string[];
  columns: any;
  AddDialog: any;
  filterData: any;
  label: string;
}

export const CommonClient: React.FC<ProductsClientProps> = ({
  data,
  actions,
  columns,
  AddDialog,
  filterData,
  label,
}) => {
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading title={label} />
        {checkActionPermission(actions, "add") && (
          <AddDialog action="Save" label="Add" />
        )}
      </div>
      <Separator />
      <PermissionContext.Provider value={{ action: actions }}>
        <DataTable columns={columns} data={data} toolbarData={filterData} />
      </PermissionContext.Provider>
    </>
  );
};
