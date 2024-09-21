'use server'

import { db } from '@/core/server/db'
import { lucia } from '@/core/server/lucia'
import { users } from '@/core/server/schema'
import { eq } from 'drizzle-orm'
import { cookies } from 'next/headers'

export async function signUpAction(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const name = formData.get('name') as string

    if (!email || !password || !name) {
        return { error: 'Missing required fields' }
    }

    try {
        const existingUser = await db.select().from(users).where(eq(users.email, email.toLowerCase())).get()

        if (existingUser) {
            return { error: 'User already exists' }
        }

        const userId = crypto.randomUUID()

        await db.insert(users).values({
            id: userId,
            email: email.toLowerCase(),
            password, // Remember, storing passwords in plain text is not secure
            name,
        })

        const session = await lucia.createSession(userId, {})
        const sessionCookie = lucia.createSessionCookie(session.id)
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

        return { success: true }
    } catch (error) {
        console.error('Sign up error:', error)
        return { error: 'An unexpected error occurred' }
    }
}
