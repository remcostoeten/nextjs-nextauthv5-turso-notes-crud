import DeleteAccountButton from '@/components/auth/DeleteAccountButton'
import ProfileForm from '@/components/auth/ProfileForm'
import { getCurrentUser } from '@/core/server/actions/auth/user.actions'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
    const user = await getCurrentUser()

    if (!user) {
        redirect('/login')
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>
            <ProfileForm />
            <div className="mt-12">
                <h2 className="text-xl font-semibold mb-4 text-red-500">Danger Zone</h2>
                <DeleteAccountButton />
            </div>
        </div>
    )
}
