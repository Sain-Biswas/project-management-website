import type { ReactNode } from "react";
import { InvitationsSiteHeader } from "./site-headers";

export default function InvitationsLayout({
  children
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <InvitationsSiteHeader />
      {children}
    </>
  );
}
