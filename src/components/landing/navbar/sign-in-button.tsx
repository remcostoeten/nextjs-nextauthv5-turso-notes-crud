'use client'

import { useAuth } from '@/core/hooks/use-auth'
import { logoutAction } from '@/core/server/actions/auth/logout'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

const DEFAULT_COLOR = 'rgb(252,202,68)'

type SignUpButtonProps = {
  color?: string
}

export default function SignUpButton({
  color = DEFAULT_COLOR
}: SignUpButtonProps) {
  const router = useRouter()
  const { user, loading, isAuthenticated } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = async () => {
    const result = await logoutAction()
    if (result.success) {
      toast.success('Logged out successfully')
      router.push('/login')
    } else {
      toast.error(result.error || 'Failed to logout')
    }
  }

  if (!mounted || loading) {
    return null
  }

  if (isAuthenticated) {
    return (
      <button
        onClick={handleLogout}
        className="text-black text-[14px] px-[16px] py-[8px] rounded-[32px] no-underline"
        style={{ backgroundColor: color }}
      >
        Logout
      </button>
    )
  }

  return (
    <a
      href="/sign-up"
      rel="noopener"
      className="text-black text-[14px] px-[16px] py-[8px] rounded-[32px] no-underline"
      style={{ backgroundColor: color }}
    >
      Sign Up
    </a>
  )
}
