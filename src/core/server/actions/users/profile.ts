'use server'

import { db } from 'db'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { userProfiles, users } from 'schema'

export type ProfileUpdateData = Partial<
    Omit<typeof userProfiles.$inferInsert, 'id' | 'userId'>
>

export async function updateProfile(
    userId: string,
    data: ProfileUpdateData,
): Promise<{ success: boolean; error?: string }> {
    try {
        // Check if a profile exists for this user
        const existingProfile = await db
            .select()
            .from(userProfiles)
            .where(eq(userProfiles.userId, userId))
            .get()

        if (existingProfile) {
            // Update existing profile
            await db
                .update(userProfiles)
                .set(data)
                .where(eq(userProfiles.userId, userId))
        } else {
            // Insert new profile
            await db.insert(userProfiles).values({ userId, ...data })
        }

        // Update user name if firstName or lastName is provided
        if (data.firstName || data.lastName) {
            const user = await db
                .select()
                .from(users)
                .where(eq(users.id, userId))
                .get()

            if (user) {
                const newName =
                    `${data.firstName || user.name.split(' ')[0]} ${data.lastName || user.name.split(' ')[1] || ''}`.trim()
                await db
                    .update(users)
                    .set({ name: newName })
                    .where(eq(users.id, userId))
            }
        }

        // Update user email if provided
        if (data.email) {
            await db
                .update(users)
                .set({ email: data.email })
                .where(eq(users.id, userId))
        }

        revalidatePath('/dashboard/settings')
        return { success: true }
    } catch (error) {
        console.error('Failed to update profile:', error)
        return { success: false, error: 'Failed to update profile' }
    }
}

export async function getProfile(userId: string) {
    try {
        const profile = await db
            .select()
            .from(userProfiles)
            .where(eq(userProfiles.userId, userId))
            .get()

        return profile || null
    } catch (error) {
        console.error('Failed to get profile:', error)
        return null
    }
}
