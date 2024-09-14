// components/auth-component.tsx
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
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ProviderButton from "./login-provider-button";

import { loginUser } from "../actions";
import { providers } from "./providers";

type LoginState = { loading: boolean; success: boolean; error: string | null };

type AuthComponentProps = {
  enabledProviders?: string[];
  mode: "login" | "signup";
};

export default function AuthComponent({
  enabledProviders = ["github", "google"],
  mode,
}: AuthComponentProps) {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { update } = useSessionWithUpdate();
  const [state, formAction] = useFormState<LoginState, FormData>(loginUser, {
    loading: false,
    success: false,
    error: null,
  });

  const handleSuccessfulAuth = useCallback(async () => {
    toast.success(`${mode === "login" ? "Login" : "Signup"} successful`);
    await update();
    router.push("/dashboard");
  }, [mode, update, router]);

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
      } else {
        handleSuccessfulAuth();
      }
    } catch (error) {
      console.error(`Error signing in with ${provider}:`, error);
      toast.error(`Error signing in with ${provider}`);
    }
  };
  return (
    <main className="w-full min-h-screen flex flex-col items-center pt-20 rounded-lg sm:px-4 relative">
      <div className="absolute pointer-events-none top-0 z-[0] h-screen w-screen bg-purple-950/10 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      <Card className="w-full sm:max-w-md md:max-w-xl lg:max-w-xl">
        <CardHeader className="text-center">
          <Logo />
          <CardTitle className="text-2xl font-normal sm:text-3xl tracking-tighter font-geist mt-5">
            {mode === "login" ? "Log in to your account" : "Create an account"}
          </CardTitle>
          <CardDescription>
            {mode === "login"
              ? "Don't have an account? "
              : "Already have an account? "}
            <Link
              href={mode === "login" ? "/signup" : "/signin"}
              className="font-medium text-purple-600 hover:text-purple-500"
            >
              {mode === "login" ? "Sign up" : "Log in"}
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
          <div className="relative">
            <span className="block w-full h-px bg-gray-300" />
            <p className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto">
              Or continue with
            </p>
          </div>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="usernameOrEmail"
                className="text-sm font-medium text-gray-700"
              >
                Email or Username
              </label>
              <Input id="usernameOrEmail" name="usernameOrEmail" required />
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
            <Button type="submit" className="w-full group">
              {mode === "login" ? "Sign in" : "Sign up"}
              <ChevronRight className="inline-flex justify-center items-center w-4 h-4 ml-2 group-hover:translate-x-1 duration-300" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
