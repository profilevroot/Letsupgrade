import { DashboardNav } from "@/components/dashboard-nav";
import { navItems } from "@/constants/data";
import { serverSession } from "@/lib/session";
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";

export default async function Sidebar() {
  const session = await serverSession();
  //console.log("navItem===>",session)
  const filteredNavItems = navItems.filter((navItem) =>{
//console.log("navItem",navItem)
    return session?.routes.includes(navItem?.href)
  }
  );
  return (
    <nav
      className={cn(
        `relative hidden h-screen border-r pt-16 lg:block w-72 bg-primary text-primary-foreground`
      )}
    >
          <ScrollArea className=" h-[calc(80vh)]">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">

            <DashboardNav items={navItems} />
          </div>
        </div>
      </div>
            </ScrollArea>
    </nav>
  );
}
