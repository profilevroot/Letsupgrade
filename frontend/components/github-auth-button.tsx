"use client";

import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { Icons } from "./icons";

export default function GoogleSignInButton() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  return (
    <Button
      className="w-full"
      type="button"
      onClick={() =>
        signIn("azure-ad", { callbackUrl: callbackUrl ?? "/dashboard" })
      }
    >
      Continue with Azure SSO
    </Button>
  );
}
