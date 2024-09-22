'use server'

import { db } from '@/core/server/db'
import { userProfiles } from '@/core/server/schema'
import { validateRequest } from '@/core/utils/auth.helpers'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

const userProfileSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    bio: z.string().max(500, 'Bio must be 500 characters or less').optional(),
    dateOfBirth: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format. Use YYYY-MM-DD'),
    address: z.string().optional(),
    language: z.string(),
    appTheme: z.enum(['light', 'dark', 'system']),
})

export async function getUserProfile() {
    const { user } = await validateRequest()

    if (!user) {
        throw new Error('Unauthorized')
    }

    try {
        const userInfo = await db
            .select({
                firstName: users.name,

                bio: userProfiles.bio,
            })
            .from(userProfiles)
            .where(eq(userProfiles.userId, user.id))
            .limit(1)

        return userInfo[0]
    } catch (error) {
        console.error('Failed to fetch user info:', error)
        throw new Error('Failed to fetch user info')
    }
}

export async function updateUserProfile(
    values: z.infer<typeof userProfileSchema>,
) {
    try {
        const { user } = await validateRequest()
        if (!user) {
            throw new Error('User not authenticated')
        }

        const validatedData = userProfileSchema.parse(values)

        const updatedProfile = await db
            .update(userProfiles)
            .set({
                firstName: validatedData.firstName,
                lastName: validatedData.lastName,
                bio: validatedData.bio,
                dateOfBirth: validatedData.dateOfBirth,
                address: validatedData.address,
                language: validatedData.language,
                appTheme: validatedData.appTheme,
            })
            .where(eq(userProfiles.userId, user.id))
            .returning()

        if (!updatedProfile || updatedProfile.length === 0) {
            throw new Error('No profile was updated')
        }

        return { message: 'Profile updated successfully' }
    } catch (error) {
        console.error('Error updating profile:', error)
        throw new Error('Failed to update profile')
    }
}
