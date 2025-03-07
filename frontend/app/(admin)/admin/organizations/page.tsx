import TableDataAPI from "@/components/custom-table/table-data-api";
import { columns } from "./columns";
import AddDialog from "./add-edit";

export default async function Page({searchParams}) {
  const breadcrumbItems = [{ title: "Organizations", link: "/admin/users" }];
  return (
      <TableDataAPI
        columns={columns}
        breadcrumbItems={breadcrumbItems}
        apiUrl="/organizations"
        appUrl="/admin/organizations"
        AddDialog={AddDialog}
        searchParams={searchParams}
      />
  );
}
