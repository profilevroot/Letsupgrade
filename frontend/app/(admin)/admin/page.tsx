import BreadCrumb from "@/components/breadcrumb";
import NoPermission from "@/components/nopermission";
import { routeActionPermission } from "@/lib/session";
import Dashboard from "@/components/notifications/dashBoard";
import { checkActionPermission } from "@/lib/utils";

const breadcrumbItems = [{ title: "Admin", link: "/admin" }];
export default async function page() {
  const actions = await routeActionPermission("/admin");
  if (!checkActionPermission(actions, "view")) {
    return <NoPermission action="view" />;
  }

  return (
    <>
      <div className="flex-1 space-y-2  p-2 md:p-4 pt-2">
        <BreadCrumb items={breadcrumbItems} />

        <h2> Welcome to ticket system</h2>
         
      </div>
    </>
  );
}
