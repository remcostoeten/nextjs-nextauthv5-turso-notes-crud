"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import { loginUser } from "./actions";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [state, formAction] = useFormState(loginUser, null);

  useEffect(() => {
    if (state?.success) {
      toast.success("Login successful");
      router.push("/dashboard");
    } else if (state?.error) {
      toast.error(state.error);
    }
  }, [state, router]);

  return (
    <Card className="w-[350px] mx-auto mt-10">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Sign in to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="usernameOrEmail">Username or Email</Label>
            <Input id="usernameOrEmail" name="usernameOrEmail" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
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
                  <EyeOffIcon className="h-4 w-4" />
                ) : (
                  <EyeIcon className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
