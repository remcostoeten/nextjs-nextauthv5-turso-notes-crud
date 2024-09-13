"use client";

import { updateNote } from "@/app/actions/notes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Note } from "@/db/schema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export function NoteEditor({ note }: { note: Note }) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content || "");
  const router = useRouter();

  async function action(formData: FormData) {
    try {
      formData.append("id", note.id.toString());
      const result = await updateNote(formData);
      toast.success(result.message);
      router.refresh();
    } catch (error) {
      toast.error("Failed to update note");
    }
  }

  return (
    <form action={action} className="space-y-4">
      <Input
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note Title"
        required
      />
      <Textarea
        name="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Note Content"
        rows={10}
      />
      <Button type="submit">Save Changes</Button>
    </form>
  );
}
