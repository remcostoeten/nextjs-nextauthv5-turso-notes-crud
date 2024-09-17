"use client";

import { createNote } from "@/core/server/actions/notes";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Textarea
} from "ui";

export default async function CreateNoteForm({
  folderId,
}: {
  folderId: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  async function action(formData: FormData) {
    try {
      formData.append("folderId", folderId.toString());
      const result = await createNote(formData);
      toast.success(result.message);
      setIsOpen(false);
      router.refresh();
      router.push(`/dashboard/notes/folder/${folderId}/note/${result.noteId}`);
    } catch (error) {
      toast.error("Failed to create note");
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          New Note
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Note</DialogTitle>
        </DialogHeader>
        <form action={action} className="space-y-4">
          <Input name="title" placeholder="Note Title" required />
          <Textarea name="content" placeholder="Note Content" rows={5} />
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create Note</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
