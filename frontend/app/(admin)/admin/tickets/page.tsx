import TableDataAPI from "@/components/custom-table/table-data-api";
import { columns } from "./columns";
import AddDialog from "./add-edit";
import { get } from "@/hooks/useBackendApi";
import { SearchParams } from "@/types";

export default async function page({ searchParams }: SearchParams) {
  const breadcrumbItems = [{ title: "Tickets", link: "/admin/tickets" }];
  const { data: category } = await get(`/categorys`, {});
  return (
    <TableDataAPI
      columns={columns}
      breadcrumbItems={breadcrumbItems}
      apiUrl="/tickets"
      appUrl="/admin/tickets"
      AddDialog={AddDialog}
      searchParams={searchParams}
      extraData={{ category: category?.data }}
    />
  );
}
