import { ChartAreaInteractive } from "@/app/(protected)/dashboard/chart-area-interactive";
import { DataTable } from "@/app/(protected)/dashboard/data-table";
import { SectionCards } from "@/app/(protected)/dashboard/section-cards";
import { DashboardSiteHeader } from "@/app/(protected)/dashboard/site-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Axiom PM"
};

import data from "./data.json";

export default function DashboardPage() {
  return (
    <>
      <DashboardSiteHeader />
      <main className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
            <DataTable data={data} />
          </div>
        </div>
      </main>
    </>
  );
}
