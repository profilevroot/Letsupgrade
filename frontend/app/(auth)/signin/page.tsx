import { Metadata } from "next";
import UserAuthForm from "@/components/forms/user-auth-form";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { fetchSession } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default async function AuthenticationPage({ ...rest }) {
  const session = await fetchSession();
  if (session) {
    if (session?.user?.user_type === "ADMIN") {
      redirect(`/admin`);
    } else {
      redirect(`/student`);
    }
  }
  return (
    <div className="relative h-screen flex-col items-center justify-center ">
      <div className="p-4 lg:p-8 h-full flex items-center ">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]  border-2 p-8 rounded-lg">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
          </div>
          <UserAuthForm />
        </div>
      </div>
    </div>
  );
}
