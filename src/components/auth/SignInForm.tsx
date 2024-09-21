'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { signUpAction } from '../../core/server/actions/auth/users'

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const result = await signUpAction(new FormData(e.currentTarget))
    setLoading(false)

    if (result.error) {
      toast.error(result.error)
    } else if (result.success) {
      toast.success('Signed up successfully!')
      router.push('/dashboard')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="name"
        type="text"
        placeholder="Name"
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full p-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
      >
        {loading ? 'Signing Up...' : 'Sign Up'}
      </button>
    </form>
  )
}
