'use server'

import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { getCurrentUser } from './user.actions'

export async function deleteAccount() {
  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Not authenticated' }
  }

  try {
    await db.delete(users).where(eq(users.id, user.id))
    return { success: true }
  } catch (error) {
    console.error('Failed to delete account:', error)
    return { error: 'Failed to delete account' }
  }
}
