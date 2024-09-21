'use server'

import { lucia } from '@/core/server/lucia'
import { cookies } from 'next/headers'

export async function logoutAction() {
    const { session } = await lucia.validateRequest()
    if (!session) {
        return { error: 'Not logged in' }
    }

    await lucia.invalidateSession(session.id)
    const sessionCookie = lucia.createBlankSessionCookie()
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

    return { success: true }
}
