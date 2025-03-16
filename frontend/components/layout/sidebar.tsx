import { DashboardNav } from "@/components/dashboard-nav";
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";

export default async function Sidebar({navItem}) { 
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

            <DashboardNav items={navItem} />
          </div>
        </div>
      </div>
            </ScrollArea>
    </nav>
  );
}
