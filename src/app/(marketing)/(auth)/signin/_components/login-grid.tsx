"use client";

import { useSessionWithUpdate } from "@/core/hooks/useSessionWithUpdate";
import { ChevronRight, EyeIcon, EyeOffIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-hot-toast";

import Logo from "@/components/base/logo";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
} from "ui";
import ProviderButton from "./login-provider-button";

import { loginUser } from "../actions";
import { providers } from "./providers";
import { OrContinueWith } from "./register.grid";

type LoginState = { loading: boolean; success: boolean; error: string | null };

type LoginFormProps = {
  enabledProviders?: string[];
};

export default function LoginForm({
  enabledProviders = ["github", "google"],
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { update } = useSessionWithUpdate();
  const [state, formAction] = useFormState<LoginState, FormData>(loginUser, {
    loading: false,
    success: false,
    error: null,
  });

  const handleSuccessfulAuth = useCallback(async () => {
    try {
      await update();
      toast.success("Login successful");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error updating session:", error);
      toast.error(
        "Login successful, but there was an error updating your session. Please try refreshing the page.",
      );
    }
  }, [update, router]);

  useEffect(() => {
    if (state.success) {
      handleSuccessfulAuth();
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state, handleSuccessfulAuth]);

  const handleProviderAuth = async (provider: string) => {
    try {
      const result = await signIn(provider, { redirect: false });
      if (result?.error) {
        toast.error(`Error signing in with ${provider}: ${result.error}`);
      } else if (result?.ok) {
        await handleSuccessfulAuth();
      }
    } catch (error) {
      console.error(`Error signing in with ${provider}:`, error);
      toast.error(`Error signing in with ${provider}`);
    }
  };

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center:px-4">
      <Card className="w-full sm:max-w-md md:max-w-xl lg:max-w-xl overflow-hidden relative">
        <div className="absolute pointer-events-none top-0 z-[0] h-screen w-screen bg-purple-950/10 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
        <CardHeader className="text-center">
          <Logo />
          <CardTitle className="text-2xl font-normal sm:text-3xl tracking-tighter font-geist mt-5">
            Log in to your account
          </CardTitle>
          <CardDescription>
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-purple-600 hover:text-purple-500"
            >
              Sign up
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
                htmlFor="usernameOrEmail"
                className="text-sm font-medium text-gray-700"
              >
                Email or Username
              </label>
              <Input
                className="border-outline-bottom bg-[rgba(17,17,17,0.5)]"
                id="usernameOrEmail"
                name="usernameOrEmail"
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
                  className="border-outline-bottom bg-[rgba(17,17,17,0.5)]"
                />
                <Button
                  typee="button"
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
            <Button type="submit" className="w-full group">
              Sign in
              <ChevronRight className="inline-flex justify-center items-center w-4 h-4 ml-2 group-hover:translate-x-1 duration-300" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
