import TableDataAPI from "@/components/custom-table/table-data-api";
import { columns } from "./columns";
import AddDialog from "./add-edit";
import { SearchParams } from "@/types";

export default async function page({ searchParams }: SearchParams) {
  const breadcrumbItems = [{ title: "Actions", link: "/admin/permissions" }];
  return (
    <TableDataAPI
      columns={columns}
      breadcrumbItems={breadcrumbItems}
      apiUrl="/routes"
      appUrl="/admin/routes"
      AddDialog={AddDialog}
      searchParams={searchParams}
    />
  );
}
