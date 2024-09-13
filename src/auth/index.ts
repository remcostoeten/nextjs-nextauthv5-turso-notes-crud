import { db } from '@/db'
import { users } from '@/db/schema'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import argon2 from 'argon2'
import { eq, or } from 'drizzle-orm'
import NextAuth, { NextAuthConfig, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

type ExtendedUser = User & {
  username?: string
}

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

        if (typeof user.password === 'string') {
          try {
            const passwordMatch = await argon2.verify(user.password, credentials.password)
            if (!passwordMatch) {
              return null
            }
          } catch (error) {
            console.error('Password verification error:', error)
            return null
          }
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
        token.username = (user as ExtendedUser).username
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        (session.user as ExtendedUser).username = token.username as string
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  debug: process.env.NODE_ENV === 'development',
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
