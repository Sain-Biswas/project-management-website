// @ts-expect-error -- no types for this plugin
import "@/styles/globals.css";

import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Axiom PM",
  description: "Your platform for easy project management."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("antialiased")}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
