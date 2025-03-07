import SignUpForm from "@/components/forms/sign-up-form";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession();
  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="relative h-screen flex-col items-center justify-center ">
      <div className="p-4 lg:p-8 h-full flex items-center ">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]  border-2 p-8 rounded-lg">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Sign-Up</h1>
          </div>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default page;
