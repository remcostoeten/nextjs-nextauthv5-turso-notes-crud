import { Skeleton } from "@/components/ui/skeleton";
import { getFoldersWithNotesCount } from "@/core/server/actions";
import { Folder } from "@/db/schema";
import { Suspense } from "react";
import { CreateFolderForm } from "./CreateFolderForm";
import { FolderItem } from "./FolderItem";

type FolderWithCount = {
  folder: Folder;
  notesCount: number;
};

async function FolderListContent(): Promise<JSX.Element> {
  const foldersWithCount: FolderWithCount[] = await getFoldersWithNotesCount();

  return (
    <>
      <CreateFolderForm folders={foldersWithCount.map(({ folder }) => folder)} />
      <ul className="space-y-2">
        {foldersWithCount.map(({ folder, notesCount }: FolderWithCount) => (
          <FolderItem key={folder.id} folder={folder} notesCount={notesCount} />
        ))}
      </ul>
    </>
  );
}

export default function FolderList(): JSX.Element {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 items-start">
        <h2 className="text-2xl font-bold">Folders</h2>
      </div>
      <Suspense fallback={<FolderListSkeleton />}>
        <FolderListContent />
      </Suspense>
    </div>
  );
}

function FolderListSkeleton(): JSX.Element {
  return (
    <div className="space-y-2">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-10 w-full" />
      ))}
    </div>
  );
}
