import TableDataAPI from "@/components/custom-table/table-data-api";
import { columns } from "./columns";
import AddDialog from "./add-edit";

export default async function page({ searchParams }) {
  const breadcrumbItems = [{ title: "Category", link: "/admin/category" }];
  return (
    <TableDataAPI
      columns={columns}
      breadcrumbItems={breadcrumbItems}
      apiUrl="/categorys"
      appUrl="/admin/category"
      AddDialog={AddDialog}
      searchParams={searchParams}
    />
  );
}
