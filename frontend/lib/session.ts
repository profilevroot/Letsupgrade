import { getServerSession } from "next-auth";
import { authOptions } from "./auth-options";
import { redirect } from "next/navigation";

export async function serverSession() {
  const session = await getServerSession(authOptions);
  return session?.user;
}

export async function routeActionPermission(route: string) {
  const session = await serverSession();
  const { routes, routesActions }: any = session;
  if (routes?.includes(route) === false) {
    redirect("/admin/nopermission");
  }
  return routesActions?.[route];
}
