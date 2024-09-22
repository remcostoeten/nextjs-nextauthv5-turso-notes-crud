import { SignUpSchema } from '@/core/models/sign-up-model.z'
import { zodResolver } from '@hookform/resolvers/zod'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { SocialSignUp } from './social-sign-up'

export default function SignUpForm({ onSubmit, isPending }: { onSubmit: (data: z.infer<typeof SignUpSchema>) => void; isPending: boolean }) {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof SignUpSchema>>({
        resolver: zodResolver(SignUpSchema),
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <div className="space-y-4">
                <div>
                    <label htmlFor="username" className="sr-only">Username</label>
                    <input
                        {...register('username')}
                        id="username"
                        type="text"
                        className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Username"
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
                <div className="relative">
                    <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                    <input
                        {...register('confirmPassword')}
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Confirm Password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                        {showConfirmPassword ? <EyeOffIcon className="h-5 w-5 text-gray-400" /> : <EyeIcon className="h-5 w-5 text-gray-400" />}
                    </button>
                    {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>}
                </div>
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
                {isPending ? 'Creating Account...' : 'Sign Up'}
            </button>

            <SocialSignUp />
        </form>
    )
}
