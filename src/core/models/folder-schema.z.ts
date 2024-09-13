import { z } from "zod";

const FolderSchema = z.object({
  name: z
    .string()
    .min(1, "Folder name is required")
    .max(50, "Folder name must be 50 characters or less"),
  description: z
    .string()
    .max(200, "Description must be 200 characters or less")
    .optional(),
  color: z
    .string()
    .regex(/^#[0-9A-F]{6}$/i, "Invalid color format")
    .optional(),
});

export type Folder = z.infer<typeof FolderSchema>;

export { FolderSchema };
