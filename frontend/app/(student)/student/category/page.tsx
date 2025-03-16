import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { get } from "@/hooks/useBackendApi";
import Link from "next/link";

export default async function Dashboard() {
  const response = await get(`/categorys?limit=200&page=0`, {});
  const queryData = response?.data;

  const icons = [
    { icon: "❓", color: "bg-blue-100" },
    { icon: "📝", color: "bg-yellow-100" },
    { icon: "📱", color: "bg-green-100" },
  ];
  return (
    <>
       <Card className="col-span-2 bg-blue-100">
        <CardHeader>
          <CardTitle className=" flex items-center justify-center">
              Categories
          </CardTitle>
        </CardHeader>
      </Card>

      {/*  <Card className="col-span-2 bg-blue-100">
            <CardContent className="flex justify-between items-center">
              <p>Unlock Unlimited Access by subscribing to premium plans</p>
              <Button>View Premium Plans →</Button>
            </CardContent>
          </Card> */}

      {queryData?.data.map((item, index) => (
        <Card key={index} className={icons[index % 3].color}>
          <Link
            href={"/student/category/" + item.id}
            className="overflow-hidden text-ellipsis whitespace-nowrap"
          >
            <CardContent className="flex flex-col items-center py-6">
              <span className="text-4xl">{icons[index % 3].icon}</span>
              <p className="mt-2 font-medium capitalize">{item.name}</p>
            </CardContent>
          </Link>
        </Card>
      ))}

      {/* <div className="col-span-2 flex justify-between">
            <Button variant="outline">Glossary</Button>
            <Button variant="outline">Acronyms</Button>
          </div> */}
    </>
  );
}
