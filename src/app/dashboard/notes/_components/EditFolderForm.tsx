"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { updateFolder } from "@/core/server/actions/folders";
import { Folder } from "@/db/schema";

const colorOptions = [
  { value: "#FF5733", label: "Red" },
  { value: "#33FF57", label: "Green" },
  { value: "#3357FF", label: "Blue" },
  { value: "#FFFF33", label: "Yellow" },
];

export function EditFolderForm({
  isOpen,
  onClose,
  folder,
}: {
  isOpen: boolean;
  onClose: () => void;
  folder: Folder;
}) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function action(formData: FormData) {
    setIsPending(true);
    try {
      formData.append("id", folder.id.toString());
      const result = await updateFolder(formData);
      toast.success(result.message);
      onClose();
      router.refresh();
    } catch (error) {
      toast.error("Failed to update folder");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Folder</DialogTitle>
        </DialogHeader>
        <form action={action} className="space-y-4">
          <Input
            name="name"
            placeholder="Folder Name"
            defaultValue={folder.name}
            required
          />
          <Textarea
            name="description"
            placeholder="Description (optional)"
            defaultValue={folder.description || ""}
          />
          <Select name="color" defaultValue={folder.color}>
            <SelectTrigger>
              <SelectValue placeholder="Select a color" />
            </SelectTrigger>
            <SelectContent>
              {colorOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center">
                    <div
                      className="w-4 h-4 rounded-full mr-2"
                      style={{ backgroundColor: option.value }}
                    />
                    {option.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Updating..." : "Update Folder"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
