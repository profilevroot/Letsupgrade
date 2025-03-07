import BreadCrumb from "@/components/breadcrumb";
import NoPermission from "@/components/nopermission";
import { routeActionPermission } from "@/lib/session";
import { checkActionPermission, cn } from "@/lib/utils";
import { TableDataClient } from "./table-data-client";
import { get } from "@/hooks/useBackendApi";

interface TableDataAPIProps {
  columns: any; // Replace 'any' with the appropriate type
  breadcrumbItems: { link: string; title: string }[]; // Adjust the type as needed
  apiUrl: string;
  appUrl: string;
  AddDialog: any;
  searchParams: any;
  extraData?: any;
}

export default async function TableDataAPI({
  columns,
  breadcrumbItems,
  apiUrl,
  appUrl,
  AddDialog,
  searchParams,
  extraData,
}: TableDataAPIProps) {
  const actions = await routeActionPermission(appUrl);
  if (!checkActionPermission(actions, "view")) {
    return <NoPermission action="views" />;
  }
  const { limit, page } = await searchParams;

  console.log("testinf", limit, page);

  const response = await get(apiUrl + `/?limit=${limit}&page=${page}`, {});
  const queryData = response?.data;

  console.log(actions, response?.data);

  return (
    <>
      <div className=" p-2 md:p-4 ">
        <BreadCrumb
          items={breadcrumbItems}
          actions={actions}
          AddDialog={AddDialog}
        />
        <TableDataClient
          columns={columns}
          apiUrl={apiUrl}
          actions={actions}
          appUrl={appUrl}
          queryData={queryData}
          extraData={extraData}
        />
      </div>
    </>
  );
}
