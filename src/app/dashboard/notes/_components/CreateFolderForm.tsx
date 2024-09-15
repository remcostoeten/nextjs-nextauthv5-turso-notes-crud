"use client";

import Flex from "@/components/atoms/Flex";
import Spacer from "@/components/atoms/Spacer";
import { ColorPicker } from "@/components/elements/color-picker";
import {} from "@/components/ui/button";
import { createFolder } from "@/core/server/actions/folders";
import { Folder } from "@/db/folders";
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
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "ui";

type CreateFolderFormProps = {
  folders: Folder[];
};

export function CreateFolderForm({ folders }: CreateFolderFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [color, setColor] = useState("#B4D455");
  const [parentId, setParentId] = useState<string | undefined>(undefined);
  const router = useRouter();

  async function action(formData: FormData) {
    setIsPending(true);
    try {
      formData.append("color", color);
      if (parentId) {
        formData.append("parentId", parentId);
      }
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
        <form action={action}>
          <Spacer spaceY="4">
            <Spacer spaceY="2">
              <Label htmlFor="name">Folder Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter folder name"
                required
              />
            </Spacer>

            <Spacer spaceY="2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter folder description"
              />
            </Spacer>

            <Flex dir="col" gap="2">
              <Label htmlFor="color">Folder Color</Label>
              <ColorPicker background={color} setBackground={setColor} />
            </Flex>

            <Spacer spaceY="2">
              <Label htmlFor="parentId">Parent Folder (optional)</Label>
              <Select onValueChange={setParentId} value={parentId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a parent folder" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={undefined}>None</SelectItem>
                  {folders?.map((folder) => (
                    <SelectItem key={folder.id} value={folder.id.toString()}>
                      {folder.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Spacer>

            <Flex justify="end" gap="2">
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
            </Flex>
          </Spacer>
        </form>
      </DialogContent>
    </Dialog>
  );
}
