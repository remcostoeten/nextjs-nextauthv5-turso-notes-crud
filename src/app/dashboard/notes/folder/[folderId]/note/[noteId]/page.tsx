import { NoteEditor } from "@/app/dashboard/notes/_components/notes/NoteEditor";
import { getNote } from "@/core/server/actions";

export default async function NotePage({
  params,
}: {
  params: { folderId: string; noteId: string };
}) {
  const note = await getNote(parseInt(params.noteId));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{note.title}</h1>
      <NoteEditor note={note} />
    </div>
  );
}
