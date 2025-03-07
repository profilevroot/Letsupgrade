import TableDataAPI from "@/components/custom-table/table-data-api";
import { columns } from "./columns";
import AddDialog from "./add-edit";

export default async function page({ searchParams }) {
  const breadcrumbItems = [{ title: "Actions", link: "/admin/actions" }];
  return (
    <TableDataAPI
      columns={columns}
      breadcrumbItems={breadcrumbItems}
      apiUrl="/actions"
      appUrl="/admin/actions"
      AddDialog={AddDialog}
      searchParams={searchParams}
    />
  );
}
