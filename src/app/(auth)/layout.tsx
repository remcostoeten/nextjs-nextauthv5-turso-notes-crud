import { validateRequest } from '@/core/utils/auth.helpers'
import { redirect } from 'next/navigation'

export default async function AuthRoute({ children }: { children: PageProps }) {
    const { user } = await validateRequest()

    if (user) {
        redirect('/dashboard')
    }

    return { children }
}
