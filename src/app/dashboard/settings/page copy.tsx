'use client'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const profileFormSchema = z.object({
    firstName: z.string().min(2, {
        message: 'First name must be at least 2 characters.',
    }),
    lastName: z.string().min(2, {
        message: 'Last name must be at least 2 characters.',
    }),
    email: z.string().email({
        message: 'Please enter a valid email address.',
    }),
    bio: z.string().max(160).optional(),
    dateOfBirth: z.string().optional(),
    address: z.string().optional(),
})

const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'Français' },
    { value: 'de', label: 'Deutsch' },
    { value: 'es', label: 'Español' },
]

const themeOptions = [
    { value: 'system', label: 'System' },
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
]

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('profile')

    const form = useForm<z.infer<typeof profileFormSchema>>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            bio: '',
            dateOfBirth: '',
            address: '',
        },
    })

    function onSubmit(data: z.infer<typeof profileFormSchema>) {
        toast({
            title: 'You submitted the following values:',
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(data, null, 2)}
                    </code>
                </pre>
            ),
        })
    }

    return (
        <div className="container mx-auto py-10">
            <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="space-y-4"
            >
                <TabsList>
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="appearance">Appearance</TabsTrigger>
                </TabsList>
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <TabsContent value="profile">
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile</CardTitle>
                                <CardDescription>
                                    This is how others will see you on the site.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Form {...form}>
                                    <form
                                        onSubmit={form.handleSubmit(onSubmit)}
                                        className="space-y-8"
                                    >
                                        <div className="grid grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="firstName"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            First name
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="John"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="lastName"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Last name
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="Doe"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="john.doe@example.com"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="bio"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Bio</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Tell us a little bit about yourself"
                                                            className="resize-none"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormDescription>
                                                        You can{' '}
                                                        <span>@mention</span>{' '}
                                                        other users and
                                                        organizations.
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div className="grid grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="dateOfBirth"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Date of birth
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="date"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="address"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Address
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="123 Main St, City, Country"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <Button type="submit">
                                            Update profile
                                        </Button>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="account">
                        <Card>
                            <CardHeader>
                                <CardTitle>Account</CardTitle>
                                <CardDescription>
                                    Manage your account settings and set e-mail
                                    preferences.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="language">Language</Label>
                                    <Select defaultValue="en">
                                        <SelectTrigger id="language">
                                            <SelectValue placeholder="Select Language" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {languageOptions.map((option) => (
                                                <SelectItem
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="notifications">
                                        Email Notifications
                                    </Label>
                                    <div className="flex items-center space-x-2">
                                        <Switch id="notifications" />
                                        <Label htmlFor="notifications">
                                            Receive email notifications
                                        </Label>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Save changes</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="appearance">
                        <Card>
                            <CardHeader>
                                <CardTitle>Appearance</CardTitle>
                                <CardDescription>
                                    Customize the appearance of the app.
                                    Automatically switch between day and night
                                    themes.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="theme">Theme</Label>
                                    <Select defaultValue="system">
                                        <SelectTrigger id="theme">
                                            <SelectValue placeholder="Select theme" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {themeOptions.map((option) => (
                                                <SelectItem
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Save changes</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </motion.div>
            </Tabs>
        </div>
    )
}
