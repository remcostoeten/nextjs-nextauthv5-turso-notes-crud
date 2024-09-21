import { Cookie } from '@auth/core/lib/utils/cookie'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { validateRequest } from '../server/lucia'
import { registrationSchema, RegistrationSchema } from '../server/schema'

export type AuthSession = {
  session: {
    user: {
      id: string
      name?: string
      email?: string
      username?: string
      avatarUrl?: string
      currency?: string
      role?: 'admin' | 'supporter' | 'user'
    }
  } | null
}

export const getUserAuth = async (): Promise<AuthSession> => {
  const { session, user } = await validateRequest()
  if (!session) return { session: null }
  return {
    session: {
      user: {
        id: user.id
      }
    }
  }
}

export const checkAuth = async () => {
  const { session } = await validateRequest()
  if (!session) redirect('/sign-in')
}

export const genericError = { error: 'Error, please try again.' }

export const setAuthCookie = (cookie: Cookie) => {
  cookies().set(cookie)
}

const getErrorMessage = (errors: any): string => {
  if (errors.email) return 'Invalid email address.'
  if (errors.password) return 'Invalid password.'
  return 'Incorrect email or password.'
}

export const validateAuthFormData = (formData: FormData) => {
  if (!formData.has('email') || !formData.has('password')) {
    return { error: 'Email and password are required.' }
  }

  const email = formData.get('email')?.toString() || ''
  const password = formData.get('password')?.toString() || ''

  if (!email || !password) {
    return { error: 'Email and password are required.' }
  }

  return { data: { email, password }, error: null }
}

export const validateRegistrationFormData = (
  formData: FormData
):
  | { data: RegistrationSchema; error: null }
  | { data: null; error: string } => {
  const name = formData.get('name')?.toString() || ''
  const email = formData.get('email')?.toString() || ''
  const password = formData.get('password')?.toString() || ''
  const result = registrationSchema.safeParse({ name, email, password })

  if (!result.success) {
    return { data: null, error: 'Invalid form data' }
  }

  return { data: result.data, error: null }
}
