'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

type SettingsFormProps = {
    user: { id: string; name: string; email: string }
    profile: any
    updateProfile: (
        userId: string,
        data: any,
    ) => Promise<{ success: boolean; error?: string }>
}

export default function SettingsForm({
    user,
    profile,
    updateProfile,
}: SettingsFormProps) {
    const router = useRouter()
    const [formData, setFormData] = useState({
        firstName: profile?.firstName || '',
        lastName: profile?.lastName || '',
        email: user.email,
        bio: profile?.bio || '',
        dateOfBirth: profile?.dateOfBirth || '',
        address: profile?.address || '',
        language: profile?.language || 'en',
        appTheme: profile?.appTheme || 'system',
    })

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
    ) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const result = await updateProfile(user.id, formData)
        if (result.success) {
            toast.success('Profile updated successfully')
            router.refresh()
        } else {
            toast.error(result.error || 'Failed to update profile')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Profile details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label
                            htmlFor="firstName"
                            className="block text-sm font-medium text-gray-400"
                        >
                            First name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="lastName"
                            className="block text-sm font-medium text-gray-400"
                        >
                            Last name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-400"
                    >
                        Email address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                    />
                </div>
                <div className="mt-4">
                    <label
                        htmlFor="bio"
                        className="block text-sm font-medium text-gray-400"
                    >
                        Bio
                    </label>
                    <textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows={3}
                        className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                    />
                </div>
                <div className="mt-4">
                    <label
                        htmlFor="dateOfBirth"
                        className="block text-sm font-medium text-gray-400"
                    >
                        Date of Birth
                    </label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                    />
                </div>
                <div className="mt-4">
                    <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-400"
                    >
                        Address
                    </label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                    />
                </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Preferences</h2>
                <div>
                    <label
                        htmlFor="language"
                        className="block text-sm font-medium text-gray-400"
                    >
                        Language
                    </label>
                    <select
                        id="language"
                        name="language"
                        value={formData.language}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                    >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                    </select>
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                        App appearance
                    </label>
                    <div className="space-y-2">
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="appTheme"
                                value="light"
                                checked={formData.appTheme === 'light'}
                                onChange={handleChange}
                                className="form-radio text-blue-600"
                            />
                            <span className="ml-2">Light mode</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="appTheme"
                                value="dark"
                                checked={formData.appTheme === 'dark'}
                                onChange={handleChange}
                                className="form-radio text-blue-600"
                            />
                            <span className="ml-2">Dark mode</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="appTheme"
                                value="system"
                                checked={formData.appTheme === 'system'}
                                onChange={handleChange}
                                className="form-radio text-blue-600"
                            />
                            <span className="ml-2">System preference</span>
                        </label>
                    </div>
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Save changes
                </button>
            </div>
        </form>
    )
}
