import ThemeToggle from "@/components/layout/ThemeToggle/theme-toggle";
import { cn } from "@/lib/utils";
import { MobileSidebar } from "./mobile-sidebar";
import { UserNav } from "./user-nav";
import Image from "next/image";

export default function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 border-b backdrop-blur z-20 bg-primary text-primary-foreground">
      <nav className="h-14 flex items-center justify-between px-4">
        <div className="hidden lg:block text-2xl font-extrabold">
          {/* <Image width={100} height={0} src="/eneco-logo.png" alt={""} /> */}
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
  );
}
