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
import { deleteFolder } from "@/core/server/actions/folders";
import { FolderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { EditFolderForm } from "./EditFolderForm";
import { FolderMenu } from "./FolderMenu";
import { Folder } from "@/db/schema";

export function FolderItem({ folder }: { folder: Folder }) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const router = useRouter();

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

  return (
    <li className="flex items-center justify-between p-2 rounded-md hover:bg-accent transition-colors">
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
    </li>
  );
}
