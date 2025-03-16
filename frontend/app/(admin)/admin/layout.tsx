import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { fetchSession } from "@/lib/utils";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { navItems } from "@/constants/data";

export const metadata: Metadata = {
  title: "Ticketing System",
  description: "Ticketing System",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (session?.user?.user_type !== "ADMIN") {
    redirect(`/student`);
  } 
  const NavItems = navItems.filter((navItem) =>{
    return session?.user?.routes.includes(navItem?.href)
  }
);  
  return (
    <>
      <Header navItem={NavItems} />
      <div className="flex h-screen overflow-hidden">
        <Sidebar navItem={NavItems} />
        <main className="w-full pt-12">{children}</main>
      </div>
    </>
  );
}
