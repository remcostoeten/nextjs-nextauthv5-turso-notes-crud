import { NoteList } from "@/app/dashboard/notes/_components/notes/NoteList";
import { Skeleton } from "@/components/ui/skeleton";
import { getFolder, getNotes } from "@/core/server/actions";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import CreateNoteForm from "../../_components/notes/CreateNoteForm";

export default async function FolderPage({
  params,
}: {
  params: { folderId: string };
}) {
  const folderId = parseInt(params.folderId);

  if (isNaN(folderId)) {
    notFound();
  }

  const folderPromise = getFolder(folderId);
  const notesPromise = getNotes(folderId);

  return (
    <div className="container mx-auto p-4">
      <Suspense fallback={<FolderHeaderSkeleton />}>
        <FolderHeader folderPromise={folderPromise} />
      </Suspense>

      <div className="mt-4">
        <CreateNoteForm folderId={folderId} />
      </div>

      <div className="mt-8">
        <Suspense fallback={<NoteListSkeleton />}>
          <NoteListWrapper notesPromise={notesPromise} />
        </Suspense>
      </div>
    </div>
  );
}

async function FolderHeader({
  folderPromise,
}: {
  folderPromise: Promise<any>;
}) {
  const folder = await folderPromise;
  return <h1 className="text-2xl font-bold mb-4">{folder.name}</h1>;
}

function FolderHeaderSkeleton() {
  return <Skeleton className="h-8 w-64 mb-4" />;
}

async function NoteListWrapper({
  notesPromise,
}: {
  notesPromise: Promise<any>;
}) {
  const notes = await notesPromise;
  return <NoteList notes={notes} />;
}

function NoteListSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} className="h-24 w-full" />
      ))}
    </div>
  );
}
