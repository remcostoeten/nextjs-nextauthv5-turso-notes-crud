import {
    UserProfileFormData,
    userProfileSchema,
} from '@/core/config/models/update-user.z'
import { zodResolver } from '@hookform/resolvers/zod'
import { getLanguageOptions, getThemeOptions, updateUserProfile } from 'actions'
import { motion } from 'framer-motion'
import React from 'react'
import { useForm } from 'react-hook-form'
import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    Input,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Switch,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    Textarea,
} from 'ui'

export default function UserProfileDashboard({
    userId,
    initialProfile,
}: {
    userId: string
    initialProfile: any
}) {
    const [activeTab, setActiveTab] = React.useState<string>('profile')
    const [languageOptions, setLanguageOptions] = React.useState<
        Array<{ value: string; label: string }>
    >([])
    const [themeOptions, setThemeOptions] = React.useState<
        Array<{ value: string; label: string }>
    >([])

    const form = useForm<UserProfileFormData>({
        resolver: zodResolver(userProfileSchema),
        defaultValues: initialProfile,
    })

    React.useEffect(() => {
        async function fetchOptions() {
            const [languages, themes] = await Promise.all([
                getLanguageOptions(),
                getThemeOptions(),
            ])
            setLanguageOptions(languages)
            setThemeOptions(themes)
        }
        fetchOptions()
    }, [])

    async function onSubmit(data: UserProfileFormData) {
        await updateUserProfile(userId, data)
    }

    return (
        <div className="container mx-auto py-10">
            <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="space-ay-4"
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
                                        action={form.handleSubmit(onSubmit)}
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
                                <FormField
                                    control={form.control}
                                    name="language"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Language</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select Language" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {languageOptions.map(
                                                        (option) => (
                                                            <SelectItem
                                                                key={
                                                                    option.value
                                                                }
                                                                value={
                                                                    option.value
                                                                }
                                                            >
                                                                {option.label}
                                                            </SelectItem>
                                                        ),
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="emailNotifications"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                            <div className="space-y-0.5">
                                                <FormLabel className="text-base">
                                                    Email Notifications
                                                </FormLabel>
                                                <FormDescription>
                                                    Receive email notifications
                                                    about account activity.
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                            <CardFooter>
                                <Button type="submit">Save changes</Button>
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
                                <FormField
                                    control={form.control}
                                    name="appTheme"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Theme</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select theme" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {themeOptions.map(
                                                        (option) => (
                                                            <SelectItem
                                                                key={
                                                                    option.value
                                                                }
                                                                value={
                                                                    option.value
                                                                }
                                                            >
                                                                {option.label}
                                                            </SelectItem>
                                                        ),
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                            <CardFooter>
                                <Button type="submit">Save changes</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </motion.div>
            </Tabs>
        </div>
    )
}
