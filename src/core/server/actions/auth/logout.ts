'use server'

import { eq } from 'drizzle-orm'
import { cookies } from 'next/headers'
import { db } from '../../db'
import { lucia } from '../../lucia'
import { users } from '../../schema'

export async function signInAction(formData: FormData) {
    const email = formData.get('email')
    const password = formData.get('password')

    if (
        typeof email !== 'string' ||
        email.length < 3 ||
        typeof password !== 'string' ||
        password.length < 6
    ) {
        return {
            error: 'Invalid input',
        }
    }

    const user = await db
        .select()
        .from(users)
        .where(eq(users.email, email.toLowerCase()))
        .get()

    if (!user || user.password !== password) {
        return {
            error: 'Invalid email or password',
        }
    }

    const session = await lucia.createSession(user.id, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
    )

    return { success: true }
}

export async function signOutAction() {
    const { session } = await lucia.validateRequest()
    if (!session) {
        return { error: 'Not logged in' }
    }

    await lucia.invalidateSession(session.id)
    const sessionCookie = lucia.createBlankSessionCookie()
    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
    )

    return { success: true }
}
