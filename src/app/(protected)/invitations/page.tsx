"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiClient } from "@/trpc/react";
import { IconExclamationCircleFilled } from "@tabler/icons-react";
import InvitationsReceivedDataTable from "./_table/invitations_received_data_table";

export default function InvitationsPage() {
  const [activeOrganization] =
    apiClient.organization.activeOrganization.useSuspenseQuery();

  return (
    <main className="flex flex-1 flex-col p-4">
      <Tabs defaultValue="received" className="flex flex-1 gap-4">
        <TabsList className="bg-background gap-4">
          <TabsTrigger value="received">Received</TabsTrigger>
          <TabsTrigger value="sent">Sent</TabsTrigger>
        </TabsList>
        <TabsContent value="received" className="flex flex-1 flex-col">
          <InvitationsReceivedDataTable />
        </TabsContent>
        <TabsContent value="sent" className="flex flex-1 flex-col">
          {activeOrganization ? (
            <div>Work in Progress</div>
          ) : (
            <main className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
              <IconExclamationCircleFilled className="size-12 md:size-18 lg:size-24" />
              <h1 className="text-2xl font-bold md:text-4xl">
                No active organization
              </h1>
              <p className="md:text-lg">
                Create or join a organization to continue.
              </p>
              <p className="md:text-lg">
                If you are part of a organization switch to it from organization
                switcher from the top of the sidebar.
              </p>
            </main>
          )}
        </TabsContent>
      </Tabs>
    </main>
  );
}
