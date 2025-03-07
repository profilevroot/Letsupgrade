import TableDataAPI from "@/components/custom-table/table-data-api";
import { columns } from "./columns";
import AddDialog from "./add-edit";
import { get } from "@/hooks/useBackendApi";
import { SearchParams } from "@/types";

export default async function page({ searchParams }: SearchParams) {
  const breadcrumbItems = [{ title: "users", link: "/admin/users" }];
  const { data: roles } = await get(`/roles-all`, {});
  return (
    <TableDataAPI
      columns={columns}
      breadcrumbItems={breadcrumbItems}
      apiUrl="/users"
      appUrl="/admin/users"
      AddDialog={AddDialog}
      searchParams={searchParams}
      extraData={{ roles: roles?.data }}
    />
  );
}
