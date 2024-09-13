import { Note } from "@/db/schema";
import { NoteItem } from "./NoteItem";

export function NoteList({ notes }: { notes: Note[] }) {
  return (
    <ul className="space-y-4">
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
    </ul>
  );
}
