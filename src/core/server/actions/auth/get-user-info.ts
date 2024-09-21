'use server'

import { validateRequest } from 'auth'

export async function getUserInfo() {
    const { session, user } = await validateRequest()
    if (!session) {
        return null
    }
    return user
}
