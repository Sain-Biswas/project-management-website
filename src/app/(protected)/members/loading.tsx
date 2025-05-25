import { Skeleton } from "@/components/ui/skeleton";

export default function MembersLoadingPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4">
      <section id="active-organization-suspense" className="w-full space-y-2">
        <div className="flex items-center justify-between">
          <Skeleton className="h-7 w-30 lg:w-33" />
          <div className="flex items-center gap-2 text-xl font-bold md:text-2xl">
            <Skeleton className="size-5" />
            <Skeleton className="h-7 w-30 lg:w-36" />
          </div>
        </div>
        <Skeleton className="h-12 lg:h-16" />
      </section>
      <section className="space-y-6">
        <Skeleton className="h-6 w-76 md:h-8 md:w-92" />
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Skeleton className="h-8 w-62" />
            <Skeleton className="h-8 w-22" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-8 w-26" />
            <Skeleton className="h-8 w-20 rounded-lg" />
            <Skeleton className="h-8 w-42" />
          </div>
        </div>
      </section>
      <section className="flex flex-1 flex-col items-center justify-center gap-6">
        <div className="size-8 animate-spin rounded-full border-t-2 text-transparent">
          .
        </div>
        <p>Loading</p>
      </section>
    </main>
  );
}
