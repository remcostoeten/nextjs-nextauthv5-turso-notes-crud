'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { signIn } from './actions'

const SignInSchema = z.object({
  username: z.string().min(1, 'Username or Email is required'),
  password: z.string().min(1, 'Password is required'),
})

export default function LoginPage() {
  const [isPending, setIsPending] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
  })

  const onSubmit = async (values: z.infer<typeof SignInSchema>) => {
    setIsPending(true)
    const res = await signIn(values)
    if (res.error) {
      toast.error(res.error)
    } else if (res.success) {
      toast.success('Signed in successfully')
      setTimeout(() => {
        router.push('/profile')
      }, 2000)
    }
    setIsPending(false)
  }

  return (
    <div className="flex min-h-screen w-full bg-black text-white">
      {/* Left column - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-left">
            <h2 className="mt-6 text-3xl font-extrabold">Welcome Back, Trailblazer!</h2>
            <p className="mt-2 text-sm text-gray-400">
              We are excited to have you back. Log in now and access your account.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="sr-only">Username or Email</label>
                <input
                  {...register('username')}
                  id="username"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Username or Email"
                />
                {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>}
              </div>
              <div className="relative">
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  {...register('password')}
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? <EyeOffIcon className="h-5 w-5 text-gray-400" /> : <EyeIcon className="h-5 w-5 text-gray-400" />}
                </button>
                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-purple-400 hover:text-purple-300">
                  Forgot your password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              {isPending ? 'Signing In...' : 'Log In'}
            </button>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-black text-gray-400">or</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-700 rounded-md shadow-sm bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700">
                  <span className="sr-only">Sign in with Google</span>
                  <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                  </svg>
                </button>
                <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-700 rounded-md shadow-sm bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700">
                  <span className="sr-only">Sign in with Facebook</span>
                  <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-700 rounded-md shadow-sm bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700">
                  <span className="sr-only">Sign in with Apple</span>
                  <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.146 21.146a11.738 11.738 0 01-6.963-2.25c-.42-.296-.84-.603-1.238-.92-.398-.317-.78-.646-1.138-.984a11.935 11.935 0 01-3.668-8.825c0-3.314 1.344-6.299 3.516-8.464C5.791 1.346 8.783 0 12.104 0c3.321 0 6.313 1.346 8.45 3.703 2.172 2.165 3.516 5.15 3.516 8.464 0 3.314-1.344 6.299-3.516 8.464-2.137 2.357-5.129 3.703-8.45 3.703h.042zm-1.092-4.632c.667.38 1.426.588 2.218.588.792 0 1.551-.208 2.218-.588.667-.38 1.23-.912 1.635-1.552.406-.64.63-1.368.63-2.112 0-.744-.224-1.472-.63-2.112-.405-.64-.968-1.172-1.635-1.552-.667-.38-1.426-.588-2.218-.588-.792 0-1.551.208-2.218.588-.667.38-1.23.912-1.635 1.552-.406.64-.63 1.368-.63 2.112 0 .744.224 1.472.63 2.112.405.64.968 1.172 1.635 1.552z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <a href="#" className="font-medium text-purple-400 hover:text-purple-300">
              Register
            </a>
          </p>
          <p className="mt-2 text-center text-sm text-gray-400">
            <a href="#" className="font-medium text-purple-400 hover:text-purple-300">
              Contact Support
            </a>
          </p>
        </div>
      </div>

      {/* Right column - Gradient */}
      <div className="hidden lg:block w-1/2 relative">
        <div
          className="absolute inset-0 bg-gradient-to-t from-blue-400 via-purple-500 to-purple-800"
          style={{
            maskImage: 'linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0))',
            WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0))'
          }}
        />
        {/* Stars */}
        <div className="absolute top-4 right-4 w-6 h-6 bg-white rounded-full opacity-75 shadow-lg" />
        <div className="absolute top-8 right-8 w-4 h-4 bg-white rounded-full opacity-50 shadow-md" />
        <div className="absolute bottom-4 left-4 w-5 h-5 bg-white rounded-full opacity-60 shadow-lg" />
        <div className="absolute bottom-8 left-8 w-3 h-3 bg-white rounded-full opacity-40 shadow-md" />
      </div>
    </div>
  )
}
