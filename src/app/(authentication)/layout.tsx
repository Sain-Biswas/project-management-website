import authServer from "@/server/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default async function AuthenticationLayout({
  children
}: Readonly<{ children: ReactNode }>) {
  const session = await authServer.getSession({ headers: await headers() });

  if (!!session) {
    redirect("/dashboard");
  }

  return children;
}
