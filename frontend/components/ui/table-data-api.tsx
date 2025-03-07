import BreadCrumb from "@/components/breadcrumb";
import NoPermission from "@/components/nopermission";
import { routeActionPermission } from "@/lib/session";
import { checkActionPermission, cn } from "@/lib/utils";
import { TableDataClient } from "./table-data-client";

interface TableDataAPIProps {
  columns: any; // Replace 'any' with the appropriate type
  breadcrumbItems: { link: string; title: string }[]; // Adjust the type as needed
  apiUrl: string;
  appUrl: string;
  AddDialog:any;
}

export default async function TableDataAPI({
  columns,
  breadcrumbItems,
  apiUrl,
  appUrl,
  AddDialog,
}: TableDataAPIProps) {
  const actions = await routeActionPermission(appUrl);
  if (!checkActionPermission(actions, "view")) {
    return <NoPermission action="views" />;
  }
  console.log("actions",actions);
  return (
    <>
      <div className="flex-1 space-y-2  p-2 md:p-4 pt-2">
        <BreadCrumb items={breadcrumbItems} actions={actions} AddDialog={AddDialog}  />
        <TableDataClient columns={columns} apiUrl={apiUrl} actions={actions} appUrl={appUrl} />
      </div>
    </>
  );
}
