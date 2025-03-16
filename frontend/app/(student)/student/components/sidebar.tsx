import { DashboardNav } from "@/components/dashboard-nav";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { navItems } from "@/constants/data";
import { serverSession } from "@/lib/session";
import { cn } from "@/lib/utils";
import { Home, History, LayoutDashboard, RefreshCw } from "lucide-react";

export default async function Sidebar() {
  const session = await serverSession();
  //console.log("navItem===>",session)
  const filteredNavItems = navItems.filter((navItem) => {
    //console.log("navItem",navItem)
    return session?.routes.includes(navItem?.href);
  });
  return (
    <ScrollArea className=" h-[calc(100vh)] bg-transparent shadow-xl ">
      <aside
        className={cn(
          `w-20 p-8  h-screen  bg-primary text-primary-foreground`
        )}
      >
        <nav className="flex flex-col items-center justify-between h-full">
          <Button className="text-4xl" variant="ghost">
            🏠
          </Button>
          <Button className="text-4xl" variant="ghost">
            📊
          </Button>
          <Button className="text-4xl" variant="ghost">
            📜
          </Button>
          <Button className="text-4xl" variant="ghost">
            🔄
          </Button>
        </nav>
      </aside>
    </ScrollArea>
  );
}
