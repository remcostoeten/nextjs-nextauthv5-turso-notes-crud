import { z } from 'zod'

export const userProfileSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    bio: z.string().max(500, 'Bio must be 500 characters or less').optional(),
    dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
    address: z
        .string()
        .max(200, 'Address must be 200 characters or less')
        .optional(),
    language: z.enum(['en', 'es', 'fr', 'de', 'it']),
    appTheme: z.enum(['light', 'dark', 'system']),
})

export type UserProfileFormData = z.infer<typeof userProfileSchema>
