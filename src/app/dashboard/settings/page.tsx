"use client";

import Flex from "@/components/atoms/Flex";
import DeleteAccountButton from "@/components/auth/DeleteAccountButton";
import { updateProfile } from "@/core/server/actions/auth/update-profile";
import { useSessionWithUpdate } from "@/core/hooks/useSessionWithUpdate";
import { useCallback, useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import toast from "react-hot-toast";
import {
    Avatar,
    AvatarFallback, AvatarImage,
    Button, Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle, Input, Label, Switch, Tabs, TabsContent, TabsList, TabsTrigger
} from "ui";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending ? "Saving..." : "Save Changes"}
        </Button>
    );
}

export default function UserSettingsPage() {
    const { data: session, status, update } = useSessionWithUpdate();
    const [isEditing, setIsEditing] = useState(false);
    const [emailNotifications, setEmailNotifications] = useState(false);
    const [twoFactorAuthentication, setTwoFactorAuthentication] = useState(false);
    const [name, setName] = useState(session?.user?.name || "");
    const [username, setUsername] = useState(session?.user?.username || "");

    useEffect(() => {
        if (session?.user) {
            setName(session.user.name || "");
            setUsername(session.user.username || "");
        }
    }, [session]);

    const handleProfileUpdate = useCallback(async (prevState: any, formData: FormData) => {
        const result = await updateProfile(prevState, formData);
        if (result.success) {
            const updatedName = formData.get("name") as string;
            const updatedUsername = formData.get("username") as string;
            await update({ name: updatedName, username: updatedUsername });
            setName(updatedName);
            setUsername(updatedUsername);
            toast.success("Profile updated successfully");
            setIsEditing(false);
        } else if (result.error) {
            toast.error(result.error);
        }
        return result;
    }, [update]);

    const [state, formAction] = useFormState(handleProfileUpdate, null);

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (status === "unauthenticated") {
        return <div>Access Denied</div>;
    }

    return (
        <div className="min-h-screen p-8 text-text-title">
            <div className="max-w-4xl mx-auto border-regular p-8 rounded-lg">
                <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

                <Tabs defaultValue="profile">
                    <TabsList>
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="account">Account</TabsTrigger>
                        <TabsTrigger value="security">Security</TabsTrigger>
                    </TabsList>

                    <TabsContent value="profile" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile</CardTitle>
                                <CardDescription>Manage your public profile information.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between items-center mb-4">
                                    <Avatar>
                                        <AvatarImage src={session?.user?.image || ""} alt={name || ""} />
                                        <AvatarFallback>{name?.charAt(0) || username?.charAt(0) || "U"}</AvatarFallback>
                                    </Avatar>
                                    {!isEditing && (
                                        <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                                    )}
                                </div>
                                <form action={formAction} className="space-y-4">
                                    <div>
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            readOnly={!isEditing}
                                            className={!isEditing ? "bg-gray-100" : ""}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            value={session?.user?.email || ""}
                                            readOnly
                                            className="bg-gray-100"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="username">Username</Label>
                                        <Input
                                            id="username"
                                            name="username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            readOnly={!isEditing}
                                            className={!isEditing ? "bg-gray-100" : ""}
                                        />
                                    </div>
                                    {isEditing && (
                                        <div>
                                            <Label htmlFor="newPassword">New Password</Label>
                                            <Input
                                                id="newPassword"
                                                name="newPassword"
                                                type="password"
                                                placeholder="Leave blank to keep current password"
                                            />
                                        </div>
                                    )}
                                    {isEditing && (
                                        <div className="flex space-x-4">
                                            <SubmitButton />
                                            <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                                        </div>
                                    )}
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="account">
                        <Card>
                            <CardHeader>
                                <CardTitle>Account Preferences</CardTitle>
                                <CardDescription>Manage your account settings and preferences.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Flex justify='between'>
                                    <p>Receive email updates about your account</p>
                                    <Switch
                                        id="email-notifications"
                                        checked={emailNotifications}
                                        onChange={(e) => setEmailNotifications((e.target as HTMLInputElement).checked)}
                                    />
                                </Flex>
                                <Flex justify='between'>
                                    <p>Add an extra layer of security to your account</p>
                                    <Switch
                                        id="two-factor-authentication"
                                        checked={twoFactorAuthentication}
                                        onChange={(e) => setTwoFactorAuthentication((e.target as HTMLInputElement).checked)}
                                    />
                                </Flex>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="security">
                        <Card>
                            <CardHeader>
                                <CardTitle>Security Settings</CardTitle>
                                <CardDescription>Manage your account security and connected devices.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Flex dir='col' gap='2'>
                                    <Label htmlFor="current-password">Current Password</Label>
                                    <Input id="current-password" type="password" />
                                </Flex>
                                <Flex dir='col' gap='2'>
                                    <Label htmlFor="new-password">New Password</Label>
                                    <Input id="new-password" type="password" />
                                </Flex>
                                <Flex dir='col' gap='2'>
                                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                                    <Input id="confirm-password" type="password" />
                                </Flex>
                                <Button>Change Password</Button>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline">Log Out of All Devices</Button>
                                <DeleteAccountButton user={session?.user} />
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
