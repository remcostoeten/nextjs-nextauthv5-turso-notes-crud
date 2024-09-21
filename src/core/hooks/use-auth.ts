'use client'

import { useEffect, useState } from 'react'

export const useAuthCheck = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await getUserInfo()
      setUser(userInfo)
      setLoading(false)
    }

    fetchUser()
  }, [])

  return { user, loading }
}
