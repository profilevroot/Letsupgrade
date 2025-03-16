import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import ThemeToggle from "@/components/layout/ThemeToggle/theme-toggle";
import { UserNav } from "@/components/layout/user-nav";
import { cn } from "@/lib/utils";
export default function Header() {
  return (
    <>
      <div className="shadow-md bg-primary text-primary-foreground">
        <nav className="h-14 flex items-center justify-between px-4">
          <div className="hidden lg:block text-2xl font-extrabold">
            Ticketing System
          </div>

          <div className={cn("block lg:!hidden")}>
            <MobileSidebar />
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <UserNav />
          </div>
        </nav>
      </div>
    </>
  );
}
