'use server'

import { db } from '@/core/server/db'
import { lucia } from '@/core/server/lucia'
import { users } from '@/core/server/schema'
import { eq } from 'drizzle-orm'
import { cookies } from 'next/headers'

export async function loginAction(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
        return { error: 'Missing required fields' }
    }

    try {
        const user = await db.select().from(users).where(eq(users.email, email.toLowerCase())).get()

        if (!user || user.password !== password) {
            return { error: 'Invalid email or password' }
        }

        const session = await lucia.createSession(user.id, {})
        const sessionCookie = lucia.createSessionCookie(session.id)
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

        return { success: true }
    } catch (error) {
        console.error('Login error:', error)
        return { error: 'An unexpected error occurred' }
    }
}
