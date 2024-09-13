import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Note } from "@/db/schema";
import Link from "next/link";

export function NoteItem({ note }: { note: Note }) {
  return (
    <Link href={`/dashboard/notes/folder/${note.folderId}/note/${note.id}`}>
      <Card className="hover:bg-accent transition-colors">
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
