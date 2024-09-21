'use client'

import { validateRequest } from '@/core/server/lucia'
import { useEffect, useState } from 'react'

export type User = {
  id: string
  email: string
  name: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUser() {
      try {
        const result = await validateRequest()
        setUser(result.user as User | null)
      } catch (error) {
        console.error('Failed to load user:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [])

  return { user, loading, isAuthenticated: !!user }
}
