import { db } from '@/db'
import { users } from '@/db/schema'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import argon2 from 'argon2'
import { eq, or } from 'drizzle-orm'
import NextAuth, { NextAuthConfig } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authConfig: NextAuthConfig = {
    adapter: DrizzleAdapter(db),
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                usernameOrEmail: { label: "Username or Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.usernameOrEmail || !credentials?.password) {
                    return null
                }

                const user = await db.select()
                    .from(users)
                    .where(or(
                        eq(users.username, credentials.usernameOrEmail),
                        eq(users.email, credentials.usernameOrEmail)
                    ))
                    .get()

                if (!user) {
                    return null
                }

                const passwordMatch = await argon2.verify(user.password, credentials.password)

                if (!passwordMatch) {
                    return null
                }

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    username: user.username,
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.username = user.username
            }
            return token
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string
                session.user.username = token.username as string
            }
            return session
        }
    },
    pages: {
        signIn: '/login',
        // Uncomment and add these if you have custom pages for them
        // signOut: '/auth/signout',
        // error: '/auth/error',
        // verifyRequest: '/auth/verify-request',
        // newUser: '/auth/new-user'
    },
    session: {
        strategy: 'jwt',
    },
    // Uncomment and set this if your app is not hosted at the root of the domain
    // baseUrl: process.env.NEXTAUTH_URL,
    debug: process.env.NODE_ENV === 'development',
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)

// You can export a separate config without handlers if needed
export const authOptions: NextAuthConfig = authConfig
