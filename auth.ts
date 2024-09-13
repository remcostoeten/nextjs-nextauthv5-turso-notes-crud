import { DrizzleAdapter } from '@auth/drizzle-adapter'
import argon2 from 'argon2'
import { eq, or } from 'drizzle-orm'
import NextAuth, { NextAuthConfig } from 'next-auth'
                const user = await db.select()
                    .from(users)
                    .where(or(eq(users.username, credentials.usernameOrEmail), eq(users.email, credentials.usernameOrEmail)))
                    .get()

                if (!user) {
                    return null
export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
