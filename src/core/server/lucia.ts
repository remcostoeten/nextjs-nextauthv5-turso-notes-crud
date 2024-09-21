import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle'
import { Lucia, TimeSpan } from 'lucia'
import { cookies } from 'next/headers'
import { cache } from 'react'
import { db } from './db'
import { sessions, users } from './schema'

const adapter = new DrizzleSQLiteAdapter(db, sessions, users)

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === 'production'
    }
  },
  sessionExpiresIn: new TimeSpan(30, 'd'),
  getUserAttributes: (attributes) => {
    return {
      id: attributes.id,
      email: attributes.email,
      name: attributes.name
    }
  }
})

export const validateRequest = cache(
  async () => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null
    if (!sessionId) {
      return { user: null, session: null }
    }
    const { user, session } = await lucia.validateSession(sessionId)
    try {
      if (session && session.fresh) {
        const sessionCookie = lucia.createSessionCookie(session.id)
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
      }
      if (!session) {
        const sessionCookie = lucia.createBlankSessionCookie()
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
      }
    } catch { }
    return { user, session }
  }
)

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: {
      id: string
      email: string
      name: string
    }
  }
}
