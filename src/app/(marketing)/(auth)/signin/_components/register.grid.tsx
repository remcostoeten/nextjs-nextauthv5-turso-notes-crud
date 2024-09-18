"use client";

import { ChevronRight, EyeIcon, EyeOffIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-hot-toast";

import Logo from "@/components/base/logo";
import { useSessionWithUpdate } from "@/core/hooks/useSessionWithUpdate";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
} from "ui";
import { RegisterState, registerUser } from "../../sign-up/actions";
import ProviderButton from "./login-provider-button";
import { providers } from "./providers";

type RegisterFormProps = {
  enabledProviders?: string[];
};

export default function RegisterForm({
  enabledProviders = ["github", "google"],
}: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { update } = useSessionWithUpdate();
  const [state, formAction] = useFormState<RegisterState, FormData>(
    registerUser,
    {
      loading: false,
      success: false,
      error: null,
    },
  );

  const handleSuccessfulAuth = useCallback(async () => {
    try {
      await update();
      toast.success(
        "Registration successful! Please log in with your new account.",
      );
      router.push("/signin");
    } catch (error) {
      console.error("Error updating session:", error);
      toast.error(
        "Registration successful, but there was an error updating your session. Please try logging in manually.",
      );
    }
  }, [update, router]);

  useEffect(() => {
    if (state.success && state.requireLogin) {
      handleSuccessfulAuth();
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state, handleSuccessfulAuth]);

  const handleProviderAuth = async (provider: string) => {
    try {
      const result = await signIn(provider, { redirect: false });
      if (result?.error) {
        toast.error(`Error signing up with ${provider}: ${result.error}`);
      } else if (result?.ok) {
        await handleSuccessfulAuth();
      }
    } catch (error) {
      console.error(`Error signing up with ${provider}:`, error);
      toast.error(`Error signing up with ${provider}`);
    }
  };

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center px-4">
      <Card className="w-full sm:max-w-md md:max-w-xl lg:max-w-xl overflow-hidden relative !bg-[rgba(17,17,17,0.5)]">
        <div className="absolute pointer-events-none top-0 z-[0] h-screen w-screen bg-purple-950/10 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
        <CardHeader className="text-center">
          <Logo />
          <CardTitle className="text-2xl font-normal sm:text-3xl tracking-tighter font-geist mt-5">
            Create your account
          </CardTitle>
          <CardDescription>
            Already have an account?{" "}
            <Link
              href="/signin"
              className="font-medium text-purple-600 hover:text-purple-500"
            >
              Sign in
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-3 gap-x-3">
            {enabledProviders.map((providerKey) => {
              const provider = providers[providerKey as keyof typeof providers];
              if (provider) {
                return (
                  <ProviderButton
                    key={providerKey}
                    provider={provider}
                    onClick={() => handleProviderAuth(providerKey)}
                  />
                );
              }
              return null;
            })}
          </div>
          <OrContinueWith />
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <Input
                className="border-outline-bottom bg-[rgba(17,17,17,0.5)]"
                id="name"
                name="name"
                required
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <Input
                className="border-outline-bottom bg-[rgba(17,17,17,0.5)]"
                id="email"
                name="email"
                type="email"
                required
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <Input
                className="border-outline-bottom bg-[rgba(17,17,17,0.5)]"
                id="username"
                name="username"
                required
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="border-outline-bottom bg-[rgba(17,17,17,0.5)]"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4 text-gray-500" />
                  ) : (
                    <EyeIcon className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  required
                  className="border-outline-bottom bg-[rgba(17,17,17,0.5)]"
                />
              </div>
            </div>
            <Button type="submit" className="w-full group">
              Sign up
              <ChevronRight className="inline-flex justify-center items-center w-4 h-4 ml-2 group-hover:translate-x-1 duration-300" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

export function OrContinueWith() {
  return (
    <div className="relative">
      <span className="block w-full h-px bg-border-outline" />
      <p className="inline-block w-fit text-sm bg-[rgba(17,17,17,0.5)] px-2 absolute -top-2 inset-x-0 mx-auto">
        Or continue with
      </p>
    </div>
  );
}
