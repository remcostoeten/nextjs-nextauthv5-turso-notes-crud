import Link from "next/link";
import { Note } from "schema";
import { Card, CardDescription, CardHeader, CardTitle } from "ui";

export function NoteItem({ note }: { note: Note }) {
  return (
    <Link href={`/dashboard/notes/folder/${note.folderId}/note/${note.id}`}>
      <Card className="hover:bg-button-hover hover:border-outline  transition-colors">
        <CardHeader>
          <CardTitle>{note.title}</CardTitle>
          <CardDescription>
            {note.content ? note.content.slice(0, 100) + "..." : "No content"}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
