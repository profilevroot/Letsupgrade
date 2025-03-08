/* import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar"; */
import type { Metadata } from "next";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import { Button } from "@/components/ui/button";
import { Home, History, LayoutDashboard, RefreshCw } from "lucide-react";

export const metadata: Metadata = {
  title: "Ticketing System",
  description: "Ticketing System",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="w-full">
          <Header />

          <div className="flex">
            <main className="flex-1 p-6 grid grid-cols-2 gap-4">
              {children}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
