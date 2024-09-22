'use client'

import { useEffect, useState } from 'react'
import { validateRequest } from '../utils/auth.helpers'

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
                const { user } = await validateRequest()
                setUser(user as User | null)
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
