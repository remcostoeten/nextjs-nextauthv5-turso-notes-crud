'use server'

import { validateRequest } from '@/core/utils/auth.helpers'
import { eq } from 'drizzle-orm'
import { db } from '../../db'
import { users } from '../../schema'

export async function getUserInfo() {
    const { user } = await validateRequest()

    if (!user) {
        throw new Error('Unauthorized')
    }

    try {
        const userInfo = await db
            .select({
                firstName: users.name,
                email: users.email,
            })
            .from(users)
            .where(eq(users.id, user.id))
            .limit(1)

        return userInfo[0]
    } catch (error) {
        console.error('Failed to fetch user info:', error)
        throw new Error('Failed to fetch user info')
    }
}
