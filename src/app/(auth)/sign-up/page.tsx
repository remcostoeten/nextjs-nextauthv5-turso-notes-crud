'use client';

import { GradientBackground } from '@/components/auth/register/gradient-background';
import { SignUpForm } from '@/components/auth/sign-up-form';
import { signUp } from '@/core/server/actions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function SignUpPage() {
  const [isPending, setIsPending] = useState<boolean>(false)
  const router = useRouter()

  const handleSignUp = async (values: any) => {
    setIsPending(true)
    const res = await signUp(values)
    if (res.error) {
      toast.error(res.error)
    } else if (res.success) {
      toast.success('Account created successfully')
      setTimeout(() => {
        router.push('/profile')
      }, 2000)
    }
    setIsPending(false)
  }

  return (
    <div className="flex min-h-screen w-full bg-black text-white">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-left">
            <h2 className="mt-6 text-3xl font-extrabold">Join the Adventure, Trailblazer!</h2>
            <p className="mt-2 text-sm text-gray-400">
              Create your account and start your journey with us today.
            </p>
          </div>
          <SignUpForm onSubmit={handleSignUp} isPending={isPending} />
          <p className="mt-8 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <a href="#" className="font-medium text-purple-400 hover:text-purple-300">
              Log in
            </a>
          </p>
          <p className="mt-2 text-center text-sm text-gray-400">
            <a href="#" className="font-medium text-purple-400 hover:text-purple-300">
              Contact Support
            </a>
          </p>
        </div>
      </div>
      <GradientBackground />
    </div>
  )
}
