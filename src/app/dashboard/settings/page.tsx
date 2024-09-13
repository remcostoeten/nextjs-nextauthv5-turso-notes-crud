"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DeleteAccountButton from "@/components/auth/DeleteAccountButton";

export default function UserSettingsPage() {
  const { data: session } = useSession();
  const [name, setName] = useState(session?.user?.name || "");
  const [email, setEmail] = useState(session?.user?.email || "");

  const handleSaveProfile = () => {
    // Implement save profile logic
    console.log("Saving profile:", { name, email });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList className="bg-gray-800 p-1 rounded-lg">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-gray-700"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="account"
              className="data-[state=active]:bg-gray-700"
            >
              Account
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="data-[state=active]:bg-gray-700"
            >
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                  Manage your public profile information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage
                      src={session?.user?.image || ""}
                      alt={session?.user?.name || ""}
                    />
                    <AvatarFallback>
                      {session?.user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline">Change Avatar</Button>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-700"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveProfile}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="account">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Account Preferences</CardTitle>
                <CardDescription>
                  Manage your account settings and preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-400">
                      Receive email updates about your account
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-400">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your account security and connected devices.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    className="bg-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    className="bg-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    className="bg-gray-700"
                  />
                </div>
                <Button className="w-full">Change Password</Button>
              </CardContent>
              <CardFooter className="flex justify-between">
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
s;
