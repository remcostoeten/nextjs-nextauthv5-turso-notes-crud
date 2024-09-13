"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createFolder } from "@/core/server/actions/folders";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export function CreateFolderForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [color, setColor] = useState("#000000");
  const router = useRouter();

  async function action(formData: FormData) {
    setIsPending(true);
    try {
      formData.append("color", color);
      const result = await createFolder(formData);
      toast.success(result.message);
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      toast.error("Failed to create folder");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <PlusIcon className="mr-2 h-4 w-4" />
          New Folder
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Folder</DialogTitle>
        </DialogHeader>
        <form action={action} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Folder Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter folder name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter folder description"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="color">Folder Color</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="color"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-12 h-12 p-1 rounded-md"
              />
              <Input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="flex-grow"
                placeholder="#000000"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Folder"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
