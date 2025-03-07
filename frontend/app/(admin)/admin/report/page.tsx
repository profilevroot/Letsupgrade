import BreadCrumb from "@/components/breadcrumb";
import NoPermission from "@/components/nopermission";
import { Report } from "@/components/tables/dashboard1/report";
import { dashboard1 } from "@/constants/data";
import { routeActionPermission } from "@/lib/session";
import { checkActionPermission } from "@/lib/utils";
const currentRoute = "/admin/users";

const breadcrumbItems = [{ title: "Report", link: currentRoute }];
export default async function page() {
  const actions = await routeActionPermission(currentRoute);
  if (!checkActionPermission(actions, "view")) {
    return <NoPermission action="view" />;
  }
  const downloadPermissoin = checkActionPermission(actions, "download");
  return (
    <>
      <div className="flex-1 space-y-2  p-2 md:p-4 pt-2">
        <BreadCrumb items={breadcrumbItems} />
        <Report data={dashboard1} downloadPermissoin={downloadPermissoin} />
      </div>
    </>
  );
}
