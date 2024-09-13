import { Skeleton } from "@/components/ui/skeleton";
import { getFolders } from "@/core/server/actions/folders";
import { ReactNode, Suspense } from "react";
import { FolderList } from "./_components/FolderList";

export default async function NotesLayout({
  children,
}: {
  children: ReactNode;
}) {
  const folders = await getFolders();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Notes</h1>
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
        <aside className="md:border-r pr-6">
          <Suspense fallback={<FolderListSkeleton />}>
            <FolderList initialFolders={folders} />
          </Suspense>
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
}

function FolderListSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-9 w-28" />
      </div>
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    </div>
  );
}
