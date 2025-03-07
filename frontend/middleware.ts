// Protecting routes with next-auth
// https://next-auth.js.org/configuration/nextjs#middleware
// https://nextjs.org/docs/app/building-your-application/routing/middleware

export { default } from "next-auth/middleware";
export const config = { matcher: ["/admin/:path*"] };

/* export const config = { matcher: ["/dashboard/:path*"] };
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { adminAccess } from "./constants/adminAccess";

export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent
) {
  const token = await getToken({ req });

  if (adminAccess.includes(req.nextUrl.pathname) && token?.role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard/nopermission", req.url));
  }

  const authMiddleware = await withAuth({
    callbacks: {
      authorized: async ({ req, token }) => {
        if (adminAccess.includes(req.nextUrl.pathname))
          return token?.role === "admin";
        return !!token;
      },
    },
  });

  // @ts-expect-error
  return authMiddleware(req, event);
}
 */
