import { Skeleton } from "@/components/ui/skeleton";
import { getFolders } from "@/core/server/actions/folders";
import { Suspense } from "react";
import { CreateFolderForm } from "./CreateFolderForm";
import { FolderItem } from "./FolderItem";

async function FolderListContent() {
  const folders = await getFolders();

  return (
    <ul className="space-y-2">
      {folders.map((folder) => (
        <FolderItem key={folder.id} folder={folder} />
      ))}
    </ul>
  );
}

export function FolderList() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Folders</h2>
        <CreateFolderForm />
      </div>
      <Suspense fallback={<FolderListSkeleton />}>
        <FolderListContent />
      </Suspense>
    </div>
  );
}

function FolderListSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-10 w-full" />
      ))}
    </div>
  );
}
