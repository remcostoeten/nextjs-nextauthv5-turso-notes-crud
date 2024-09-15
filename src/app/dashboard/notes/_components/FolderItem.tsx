"use client";

import { createNote, deleteFolder } from "@/core/server/actions";
import { FolderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Folder } from "schema";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "ui";
import { EditFolderForm } from "./EditFolderForm";
import { FolderMenu } from "./FolderMenu";

type DialogState = "closed" | "edit" | "delete" | "createNote";

export default function FolderItem({
  folder,
  notesCount,
}: {
  folder: Folder;
  notesCount: number;
}) {
  const [dialogState, setDialogState] = useState<DialogState>("closed");
  const router = useRouter();

  const handleFolderClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (notesCount === 0 && dialogState === "closed") {
      setDialogState("createNote");
    } else if (dialogState === "closed") {
      router.push(`/dashboard/notes/folder/${folder.id}`);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDialogState("edit");
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDialogState("delete");
  };

  const handleCloseDialog = () => {
    setDialogState("closed");
  };

  async function deleteAction(formData: FormData) {
    try {
      const result = await deleteFolder(formData);
      toast.success(result.message);
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete folder");
    } finally {
      handleCloseDialog();
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
    } finally {
      handleCloseDialog();
    }
  }

  return (
    <li
      className="flex items-center justify-between px-4 py-2 rounded-md hover:bg-bg-card hover:border-outline border hover:border hover:border-border-outline border-transparent transition-colors cursor-pointer"
      onClick={handleFolderClick}
    >
      <div className="flex items-center space-x-2">
        <FolderIcon
          className="h-5 w-5"
          style={{ color: folder.color || "currentColor" }}
        />
        <span className="font-medium">{folder.name}</span>
      </div>
      <FolderMenu onEdit={handleEdit} onDelete={handleDelete} />

      {dialogState === "edit" && (
        <EditFolderForm
          isOpen={true}
          onClose={handleCloseDialog}
          folder={folder}
        />
      )}

      <AlertDialog
        open={dialogState === "delete"}
        onOpenChange={handleCloseDialog}
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
            <AlertDialogCancel onClick={handleCloseDialog}>
              Cancel
            </AlertDialogCancel>
            <form action={deleteAction}>
              <input type="hidden" name="id" value={folder.id} />
              <AlertDialogAction type="submit">Delete</AlertDialogAction>
            </form>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog
        open={dialogState === "createNote"}
        onOpenChange={handleCloseDialog}
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
                onClick={handleCloseDialog}
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
