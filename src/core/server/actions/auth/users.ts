'use server'

import { eq } from 'drizzle-orm'
import { generateId } from 'lucia'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { db } from '../../db'
import { lucia } from '../../lucia'
import { users } from '../../schema'

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2)
})

export async function signUpAction(formData: FormData) {
  const result = signUpSchema.safeParse(Object.fromEntries(formData))

  if (!result.success) {
    return { error: 'Invalid form data' }
  }

  const { email, password, name } = result.data
  const userId = generateId(15)

  try {
    // Check if the user already exists
    const existingUser = await db.select().from(users).where(eq(users.email, email.toLowerCase())).get()

    if (existingUser) {
      return { error: 'Email already in use' }
    }

    // Insert the new user
    await db.insert(users).values({
      id: userId,
      email: email.toLowerCase(),
      name,
      hashedPassword: await Bun.password.hash(password)
    })

    // Create a new session
    const session = await lucia.createSession(userId, {})
    const sessionCookie = lucia.createSessionCookie(session.id)

    return { success: true, sessionCookie }
  } catch (error) {
    console.error('Sign up error:', error)
    return { error: 'An unexpected error occurred' }
  }
}

export async function signOutAction() {
  const { session } = await lucia.validateRequest()
  if (!session) {
    return { error: 'Unauthorized' }
  }

  await lucia.invalidateSession(session.id)
  const sessionCookie = lucia.createBlankSessionCookie()
  redirect('/sign-in')
}
