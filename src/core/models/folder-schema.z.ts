import { z } from "zod";

export const FolderSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  description: z.string().max(1000).optional(),
  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Invalid color format")
    .optional(),
  parentId: z.number().int().positive().optional(),
});

export type Folder = z.infer<typeof FolderSchema>;
