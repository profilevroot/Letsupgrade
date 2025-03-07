import TableDataAPI from "@/components/custom-table/table-data-api";
import { columns } from "./columns";
import AddDialog from "./add-edit";


export default async function page({searchParams}) {
  const breadcrumbItems = [{ title: "Users", link: "/admin/users" }];
  return (
    <TableDataAPI
              columns={columns}
              breadcrumbItems={breadcrumbItems}
              apiUrl="/users"
              appUrl="/admin/users"
              AddDialog={AddDialog}
              searchParams={searchParams}
            /> 
  );
}
