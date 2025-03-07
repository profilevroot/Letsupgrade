import TableDataAPI from "@/components/custom-table/table-data-api";
import { columns } from "./columns";
import AddDialog from "./add-edit";
import { SearchParams } from "@/types";

export default async function page({ searchParams }: SearchParams) {
  const breadcrumbItems = [{ title: "Groups", link: "/admin/groups" }];
  return (
    <TableDataAPI
      columns={columns}
      breadcrumbItems={breadcrumbItems}
      apiUrl="/groups"
      appUrl="/admin/groups"
      AddDialog={AddDialog}
      searchParams={searchParams}
    />
  );
}
