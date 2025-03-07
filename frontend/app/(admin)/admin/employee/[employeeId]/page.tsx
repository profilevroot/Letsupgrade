import BreadCrumb from "@/components/breadcrumb";
import { ProductForm } from "@/components/forms/product-form";
import NoPermission from "@/components/nopermission";
import {routeActionPermission } from "@/lib/session";
import { checkActionPermission } from "@/lib/utils";
import React from "react";

export default async function Page() {
  const actions = await routeActionPermission(
    "/admin/users"
  );
  if (!checkActionPermission(actions, "view")) {
    return <NoPermission action="View" />;
  }
  const breadcrumbItems = [
    { title: "Employee", link: "/dashboard/employee" },
    { title: "Create", link: "/dashboard/employee/create" },
  ];
  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <ProductForm
        categories={[
          { _id: "shirts", name: "shirts" },
          { _id: "pants", name: "pants" },
        ]}
        initialData={null}
        key={null}
      />
    </div>
  );
}
