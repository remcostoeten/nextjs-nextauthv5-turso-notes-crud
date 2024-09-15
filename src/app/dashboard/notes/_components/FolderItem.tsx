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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteFolder } from "@/core/server/actions/folders";
import { createNote } from "@/core/server/actions/notes";
import { Folder } from "schema";
import { FolderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { EditFolderForm } from "./EditFolderForm";
import { FolderMenu } from "./FolderMenu";

export function FolderItem({
  folder,
  notesCount,
}: {
  folder: Folder;
  notesCount: number;
}) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCreateNoteDialogOpen, setIsCreateNoteDialogOpen] = useState(false);
  const router = useRouter();

  const handleFolderClick = () => {
    if (notesCount === 0) {
      setIsCreateNoteDialogOpen(true);
    } else {
      router.push(`/dashboard/notes/folder/${folder.id}`);
    }
  };

  const handleEdit = () => {
    setIsEditDialogOpen(true);
  };

  async function deleteAction(formData: FormData) {
    try {
      const result = await deleteFolder(formData);
      toast.success(result.message);
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete folder");
    }
  }

  async function createNoteAction(formData: FormData) {
    try {
      formData.append("folderId", folder.id.toString());
      const result = await createNote(formData);
      toast.success(result.message);
      router.push(`/dashboard/notes/folder/${folder.id}/note/${result.noteId}`);
    } catch (error) {
      toast.error("Failed to create note");
    }
  }

  return (
    <li
      className="flex items-center justify-between p-2 rounded-md hover:bg-accent transition-colors cursor-pointer"
      onClick={handleFolderClick}
    >
      <div className="flex items-center space-x-2">
        <FolderIcon
          className="h-5 w-5"
          style={{ color: folder.color || "currentColor" }}
        />
        <span className="font-medium">{folder.name}</span>
      </div>
      <FolderMenu
        onEdit={handleEdit}
        onDelete={() => setIsDeleteDialogOpen(true)}
      />

      <EditFolderForm
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        folder={folder}
      />

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this folder?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              folder and all its contents.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <form action={deleteAction}>
              <input type="hidden" name="id" value={folder.id} />
              <AlertDialogAction type="submit">Delete</AlertDialogAction>
            </form>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog
        open={isCreateNoteDialogOpen}
        onOpenChange={setIsCreateNoteDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Note</DialogTitle>
          </DialogHeader>
          <form action={createNoteAction} className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Note Title"
              required
              className="w-full p-2 border rounded"
            />
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCreateNoteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Create Note</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </li>
  );
}
