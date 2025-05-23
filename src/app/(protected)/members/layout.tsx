import type { ReactNode } from "react";
import { MembersSiteHeader } from "./site-header";

export default function MembersLayout({
  children
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <MembersSiteHeader />
      {children}
    </>
  );
}
