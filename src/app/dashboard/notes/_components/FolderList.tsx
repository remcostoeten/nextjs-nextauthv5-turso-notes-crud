import { Button } from "@/components/ui/button"; // Import Button component
import { Skeleton } from "@/components/ui/skeleton";
import { getFoldersWithNotesCount } from "@/core/server/actions";
import { auth } from "auth";
import Link from "next/link";
import { Suspense } from "react";
import { Folder } from "schema";
import { CreateFolderForm } from "./CreateFolderForm";
import FolderItem from "./FolderItem";

type FolderWithCount = {
  folder: Folder;
  notesCount: number;
};

type FoldersData = {
  folders: FolderWithCount[];
  totalCount: number;
};

async function FolderListContent(): Promise<JSX.Element> {
  const session = await auth();

  if (!session?.user) {
    return (
      <div className="flex flex-col  h-full">
        <h2 className="text-2xl font-bold mb-4">Welcome to Notes App</h2>
        <p className=" mb-6">Please sign in to view and manage your folders.</p>
        <Button asChild>
          <Link href="/api/auth/signin">Sign In</Link>
        </Button>
      </div>
    );
  }

  const { folders: foldersWithCount, totalCount }: FoldersData =
    await getFoldersWithNotesCount();

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Folders</h2>
        <span className="text-sm text-subtitle">Total: {totalCount}</span>
      </div>
      <CreateFolderForm
        folders={foldersWithCount.map(({ folder }) => folder)}
      />
      <ul className="space-y-2 mt-4">
        {foldersWithCount.map(({ folder, notesCount }) => (
          <FolderItem key={folder.id} folder={folder} notesCount={notesCount} />
        ))}
      </ul>
    </>
  );
}

export default function FolderList(): JSX.Element {
  return (
    <div className="space-y-4">
      <Suspense fallback={<FolderListSkeleton />}>
        <FolderListContent />
      </Suspense>
    </div>
  );
}

function FolderListSkeleton(): JSX.Element {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-6 w-20" />
      </div>
      <Skeleton className="h-10 w-full" />
      <div className="space-y-2 mt-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    </div>
  );
}
