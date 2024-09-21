'use client'

import { useAuthCheck } from '@/core/hooks/use-auth'

const ShowUserInfo = () => {
  const { user, loading } = useAuthCheck()

  if (loading) return <div>Loading...</div>
  if (!user)
    return (
      <p>
        Please{' '}
        <a href="/sign-in" className="text-secondary-foreground underline">
          log in
        </a>{' '}
        to view your information.
      </p>
    )

  return (
    <div className="info-container">
      <h2>Welcome, {user.name}!</h2>
      <p>Email: {user.email}</p>
      <p>Currency: {user.currency}</p>
      <p>Role: {user.role}</p>
    </div>
  )
}

export default ShowUserInfo
