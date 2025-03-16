import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { fetchSession } from "@/lib/utils";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

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
  return (
    <>
      <Header />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="w-full pt-12">{children}</main>
      </div>
    </>
  );
}
