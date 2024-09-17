import { GradientPicker } from "@/components/elements/Color-picker-demo";
import { updateFolder } from "@/core/server/actions/folders";
import { Folder } from "@/db/folders";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Textarea,
} from "ui";

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
  const [background, setBackground] = useState(folder.color || "#B4D455");
  const router = useRouter();

  async function action(formData: FormData) {
    setIsPending(true);
    try {
      formData.append("id", folder.id.toString());
      formData.append("color", background);
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
          <div className="space-y-2">
            <label className="text-sm font-medium">Folder Color</label>
            <GradientPicker
              background={background}
              setBackground={setBackground}
            />
          </div>
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
