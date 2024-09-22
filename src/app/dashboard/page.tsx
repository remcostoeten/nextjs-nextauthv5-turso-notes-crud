import { validateRequest } from '@/core/utils/auth.helpers'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
    const { user } = await validateRequest()

    if (!user) {
        redirect('/login')
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-body py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-800 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-card shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-2xl font-semibold">
                                Welcome to your Dashboard
                            </h1>
                        </div>
                        <div className="divide-y divide-gray-200">
                            <div className="py-8 text-base leading-6 space-y-4 text-subtext sm:text-lg sm:leading-7">
                                <p>Hello, {user.name}!</p>
                                <p>
                                    You are logged in with email: {user.email}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
