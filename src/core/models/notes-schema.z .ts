import { z } from "zod";

const NoteSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be 100 characters or less"),
  content: z
    .string()
    .max(10000, "Content must be 10000 characters or less")
    .optional(),
  folderId: z.number().int().positive("Invalid folder ID"),
});

export type Note = z.infer<typeof NoteSchema>;

export { NoteSchema };
