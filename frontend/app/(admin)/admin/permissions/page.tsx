import BreadCrumb from "@/components/breadcrumb";
import NoPermission from "@/components/nopermission";
import { get } from "@/hooks/useBackendApi";
import { routeActionPermission } from "@/lib/session";
import { CommonClient } from "@/components/context/client";
import { columns } from "./columns";
import AddRoleDialog from "./add-edit";
import { checkActionPermission } from "@/lib/utils";

const breadcrumbItems = [{ title: "Permissions", link: "/admin/permissions" }];
const filterData = {
  filterInput: {
    column: "name",
    label: "Permission name",
  },
};
export default async function page() {
  const actions = await routeActionPermission("/admin/users");
  if (!checkActionPermission(actions, "view")) {
    return <NoPermission action="view" />;
  }
  const {data} = await get(`/permissions-all`, {});
  console.log("data", data?.data);
  return (
    <>
      <div className="flex-1 space-y-2  p-2 md:p-4 pt-2">
        <BreadCrumb items={breadcrumbItems} />
        <CommonClient
          data={data?.data}
          actions={actions}
          columns={columns}
          AddDialog={AddRoleDialog}
          filterData={filterData}
          label="Routes"
        />
      </div>
    </>
  );
}
