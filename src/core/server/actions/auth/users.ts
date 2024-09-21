'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { eq } from 'drizzle-orm'
import { generateId } from 'lucia'
import { lucia, validateRequest } from '../auth/lucia'

import { db, updateUserSchema, users } from 'db'
import { DEFAULT_CURRENCY } from '../../constant/config'
import {
  genericError,
  getUserAuth,
  setAuthCookie,
  validateAuthFormData,
  validateRegistrationFormData
} from '../auth/utils'

type ActionResult = {
  error: string
}

export async function signInAction(
  _: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const { data, error } = validateAuthFormData(formData)
  if (error !== null) return { error }

  try {
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, data.email.toLowerCase()))
    if (!existingUser) {
      return {
        error: 'Incorrect email or password.'
      }
    }

    // Compare          plain text passwords
    if (existingUser.hashedPassword !== data.password) {
      return {
        error: 'Incorrect email or password.'
      }
    }

    const session = await lucia.createSession(existingUser.id, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    setAuthCookie(sessionCookie)

    return redirect('/dashboard')
  } catch (e) {
    return genericError
  }
}

export async function signUpAction(
  _: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const { data, error } = validateRegistrationFormData(formData)

  if (error !== null) return { error }

  const userId = generateId(15)

  try {
    // Check if email already exists
    const [existingUserByEmail] = await db
      .select()
      .from(users)
      .where(eq(users.email, data.email.toLowerCase()))
    if (existingUserByEmail) {
      return {
        error:
          'The email address is already in use. Please use a different email or log in to your existing account.'
      }
    }

    // Check if username already exists
    const [existingUserByName] = await db
      .select()
      .from(users)
      .where(eq(users.name, data.name))
    if (existingUserByName) {
      return {
        error:
          'The username is already in use. Please choose a different username.'
      }
    }

    await db.insert(users).values({
      id: userId,
      email: data.email,
      name: data.name,
      currency: DEFAULT_CURRENCY,
      hashedPassword: data.password // Store password as plain text
    })
  } catch (e) {
    if (typeof e === 'object' && e !== null && 'code' in e) {
      const error = e as { code: string }
      if (error.code === 'SQLITE_CONSTRAINT') {
        return {
          error:
            'The email address is already in use. Please use a different email or log in to your existing account.'
        }
      }
    }
    return genericError
  }

  const session = await lucia.createSession(userId, {})
  const sessionCookie = lucia.createSessionCookie(session.id)
  setAuthCookie(sessionCookie)
  return redirect('/dashboard')
}

export async function signOutAction(): Promise<ActionResult> {
  const { session } = await validateRequest()
  if (!session) {
    return {
      error: 'Unauthorized'
    }
  }

  await lucia.invalidateSession(session.id)

  const sessionCookie = lucia.createBlankSessionCookie()
  setAuthCookie(sessionCookie)
  redirect('/sign-in')
}

export async function updateUser(
  _: any,
  formData: FormData
): Promise<ActionResult & { success?: boolean }> {
  const { session } = await getUserAuth()
  if (!session) return { error: 'Unauthorised' }

  const name = formData.get('name') ?? undefined
  const email = formData.get('email') ?? undefined

  const result = updateUserSchema.safeParse({ name, email })

  if (!result.success) {
    const error = result.error.flatten().fieldErrors
    if (error.name) return { error: 'Invalid name - ' + error.name[0] }
    if (error.email) return { error: 'Invalid email - ' + error.email[0] }
    return genericError
  }

  try {
    await db
      .update(users)
      .set({ ...result.data })
      .where(eq(users.id, session.user.id))
    revalidatePath('/account')
    return { success: true, error: '' }
  } catch (e) {
    return genericError
  }
}
