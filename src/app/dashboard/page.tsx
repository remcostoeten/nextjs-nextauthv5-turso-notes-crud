import { auth } from '@/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function DashboardPage() {
    const session = await auth()

    if (!session?.user) {
        return <div>Not authenticated</div>
    }

    return (
        <Card className="w-[350px] mx-auto mt-10">
            <CardHeader>
                <CardTitle>User Info</CardTitle>
                <CardDescription>Your account details</CardDescription>
            </CardHeader>
            <CardContent>
                <div>
                    <p><strong>Name:</strong> {session.user.name}</p>
                    <p><strong>Email:</strong> {session.user.email}</p>
                    <p><strong>Username:</strong> {session.user.username}</p>
                </div>
            </CardContent>
        </Card>
    )
}
