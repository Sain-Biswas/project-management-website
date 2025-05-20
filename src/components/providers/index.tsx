import { TRPCReactProvider } from "@/trpc/react";
import type { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";

/**
 * A component that applies all the Providers needed to be applied to the app.
 *
 * Used inside Root Layout.
 */
export default function Providers({
  children
}: Readonly<{ children: ReactNode }>) {
  return (
    <TRPCReactProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </TRPCReactProvider>
  );
}
