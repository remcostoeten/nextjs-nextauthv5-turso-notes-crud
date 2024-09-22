import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle'
import { Lucia, TimeSpan } from 'lucia'
import { db } from './db'
import { sessions, users } from './schema'

const adapter = new DrizzleSQLiteAdapter(db, sessions, users)

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        expires: false,
        attributes: {
            secure: process.env.NODE_ENV === 'production',
        },
    },
    sessionExpiresIn: new TimeSpan(30, 'd'),
    getUserAttributes: (attributes) => {
        return {
            id: attributes.id,
            email: attributes.email,
            name: attributes.name,
        }
    },
})

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
