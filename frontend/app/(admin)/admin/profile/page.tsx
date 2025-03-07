import BreadCrumb from "@/components/breadcrumb";
import { CreateProfileOne } from "@/components/forms/user-profile-stepper/create-profile";
import NoPermission from "@/components/nopermission";
import { ScrollArea } from "@/components/ui/scroll-area";
import {  routeActionPermission } from "@/lib/session";
import { checkActionPermission } from "@/lib/utils";

const breadcrumbItems = [{ title: "Profile", link: "/dashboard/profile" }];
export default async function page() {
  const actions = await routeActionPermission("/admin/users");
  if (!checkActionPermission(actions, "view")) {
    return <NoPermission action="view" />;
  }

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <CreateProfileOne categories={[]} initialData={null} />
      </div>
    </ScrollArea>
  );
}
