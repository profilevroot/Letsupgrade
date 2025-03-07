
import TableDataAPI from "@/components/custom-table/table-data-api";
import { columns } from "./columns";
import PopupDialog from "./popup";

const filterData = {
  filterInput: {
    column: "name",
    label: "Role name",
  },
  statusFilter: {
    column: "status",
    label: "Status",
    options: [
      { value: 0, label: "Active" },
      { value: 1, label: "Inactive" },
    ],
  },
};

const breadcrumbItems = [{ title: "Roles", link: "/admin/roles" }];
export default async function Page({searchParams}) {
  return (
      <TableDataAPI
        columns={columns}
        breadcrumbItems={breadcrumbItems}
        apiUrl="/roles"
        appUrl="/admin/roles"
        AddDialog={PopupDialog}
        searchParams={searchParams}
      />
  );
}
/* 
export default async function page() {
  const actions = await routeActionPermission("/admin/roles");
  if (!checkActionPermission(actions, "view")) {
    return <NoPermission action="view" />;
  }
  const {data} = await get(`/roles-all`, {});
  console.log("data", data?.data);
  return (
    <>
      <div className="flex-1 space-y-2  p-2 md:p-4 pt-2">
        <BreadCrumb items={breadcrumbItems} />

         <CommonClient
          data={data?.data}
          actions={actions}
          columns={columns}
          AddDialog={PopupDialog}
          filterData={filterData}
          label="Role"
        /> 
      </div>
    </>
  );
}
 */