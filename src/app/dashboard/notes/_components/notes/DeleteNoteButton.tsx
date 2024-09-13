"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteNote } from "actions";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export function DeleteNoteButton({
  noteId,
  folderId,
}: {
  noteId: number;
  folderId: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  async function action(formData: FormData) {
    try {
      const result = await deleteNote(formData);
      toast.success(result.message);
      router.push(`/dashboard/notes/folder/${folderId}`);
    } catch (error) {
      toast.error("Failed to delete note");
    }
  }

  return (
    <>
      <Button variant="destructive" onClick={() => setIsOpen(true)}>
        <TrashIcon className="mr-2 h-4 w-4" />
        Delete Note
      </Button>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this note?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              note.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <form action={action}>
              <input type="hidden" name="id" value={noteId} />
              <AlertDialogAction type="submit">Delete</AlertDialogAction>
            </form>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
