"use client";

import { SignUpSchema } from "@/core/models/sign-up-model.z";
import { signUp } from "@/core/server/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
} from "ui";
import { z } from "zod";
import FormButton from "./FormButton";

export default function SignUpForm({ handleSubmit, isPending }) {
    const [isPendingState, setIsPending] = useState(isPending);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof SignUpSchema>>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    async function onSubmit(values: z.infer<typeof SignUpSchema>) {
        setIsPending(true);
        const res = await signUp(values);
        if (res.error) {
            setIsPending(false);
            toast.error(res.error);
        } else if (res.success) {
            toast.success("Account created successfully");
            setTimeout(() => {
                setIsPending(false);
                router.push("/profile");
            }, 5000);
        }
    }

    return (
        <Form action="/your-endpoint" method="POST" onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Username"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Email"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <div className="relative">
                                <Input
                                    placeholder="****"
                                    type={showPassword ? 'text' : 'password'}
                                    {...field}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showPassword ? <EyeOffIcon className="h-5 w-5 text-gray-400" /> : <EyeIcon className="h-5 w-5 text-gray-400" />}
                                </button>
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Confirm password</FormLabel>
                        <FormControl>
                            <div className="relative">
                                <Input
                                    placeholder="****"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    {...field}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showConfirmPassword ? <EyeOffIcon className="h-5 w-5 text-gray-400" /> : <EyeIcon className="h-5 w-5 text-gray-400" />}
                                </button>
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormButton
                isPending={isPending}
                variant="default"
                defaultText="Sign up"
                pendingText="Signing up..."
            />
        </Form>
    );
}
