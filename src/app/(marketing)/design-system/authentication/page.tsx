"use client";

import Logo from "@/components/base/logo";
import { Input, Separator } from "@/components/ui";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import { loginUser } from "../../(auth)/signin/actions";
import { TwitterIcon } from "lucide-react";
import { GoogleIcon } from "../../(auth)/signin/_components/providers";
import { GitHubIcon } from "../../../../components/atoms/Icons";

const SocialButton: React.FC<{
  icon: React.ReactNode;
  onClick: () => void;
}> = ({ icon, onClick }) => (
  <button
    onClick={onClick}
    className="group flex transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset] border-white/10 items-center justify-center py-5 border rounded-lg hover:bg-transparent/50 duration-150 active:bg-transparent/50"
  >
    <div className="w-5 h-5 group-hover:-translate-y-1 duration-300 transition-all">
      {icon}
    </div>
  </button>
);

const FormInput: React.FC<{ label: string; type: string; name: string }> = ({
  label,
  type,
  name,
}) => (
  <div>
    <label className="font-medium text-gray-100/50 font-geist">{label}</label>
    <Input
      type={type}
      name={name}
      required
      className="w-full mt-2 px-3 py-5 text-gray-500 bg-transparent outline-none border focus:border-purple-600 shadow-sm rounded-lg"
    />
  </div>
);

export default function FUISignUpWithLeftBackground() {
  const [state, formAction] = useFormState(loginUser, {
    loading: false,
    success: false,
    error: null,
  });
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleSocialButtonClick = () => {
    // Implement social login logic here
    console.log("Social login clicked");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoggingIn(true);
    const formData = new FormData(e.currentTarget);
    formAction(formData);
  };

  React.useEffect(() => {
    if (state.success) {
      // Handle successful login (e.g., redirect)
      console.log("Login successful");
    } else if (state.error) {
      console.error("Login error:", state.error);
    }
    setIsLoggingIn(false);
  }, [state]);

  return (
    <main className="w-full min-h-screen flex overflow-y-hidden">
      {/* Left side (hidden on small screens) */}
      <div className="relative flex-1 hidden items-center justify-center min-h-screen bg-transparent lg:flex">
        <div className="relative z-10 w-full max-w-lg">
          <Logo />
          <div className="mt-10 space-y-3">
            <h3 className="text-white text-3xl md:text-4xl lg:text-5xl font-normal font-geist tracking-tighter">
              Your online assistant
            </h3>
            <Separator className="h-px bg-white/20 w-[100px] mr-auto" />
            <p className="text-gray-300 text-md md:text-xl font-geist tracking-tight">
              Create an account, free of charge and try out all our productivity
              tools!
            </p>
            <div className="flex items-center -space-x-2 overflow-hidden">
              <Image
                src="https://randomuser.me/api/portraits/women/79.jpg"
                alt="User Avatar 1"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <Image
                src="https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg"
                alt="User Avatar 2"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <p className="text-sm text-gray-400 font-medium translate-x-5">
                Join 2+ users <span className="rotate-25">😭</span>
              </p>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 my-auto h-full">
          <div className="absolute inset-0 opacity-15 w-full bg-transparent bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
          <Image
            className="absolute inset-x-0 -top-20 opacity-25"
            src="/assets/img/hero-left.png"
            alt="Background pattern"
            width={1000}
            height={1000}
          />
        </div>
      </div>

      <div className="flex-1 relative flex items-center justify-center min-h-full">
        <Image
          className="absolute inset-x-0 -z-1 -top-20 opacity-75"
          src="/assets/img/hero-left.png"
          alt="Background pattern"
          width={1000}
          height={1000}
        />
        <div className="w-full max-w-md md:max-w-lg space-y-8 px-4 text-gray-600 sm:px-0 z-20">
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-200 text-3xl font-semibold tracking-tighter sm:text-4xl">
              Sign up now <br /> Start your journey
            </h3>
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Log in
              </Link>
            </p>
          </div>

          <div className="grid grid-cols-3 gap-x-3">
            <SocialButton
              icon={<GoogleIcon />}
              onClick={handleSocialButtonClick}
            />
            <SocialButton
              icon={<TwitterIcon />}
              onClick={handleSocialButtonClick}
            />
            <SocialButton
              icon={<GitHubIcon />}
              onClick={handleSocialButtonClick}
            />
          </div>

          <Separator className="h-px bg-white/20" />

          <form onSubmit={handleSubmit} className="space-y-5 z-20">
            <FormInput
              label="Username or Email"
              type="text"
              name="usernameOrEmail"
            />
            <FormInput label="Password" type="password" name="password" />
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full font-geist tracking-tighter text-center rounded-md bg-gradient-to-br from-blue-400 to-blue-700 px-4 py-2 text-lg text-zinc-50 ring-2 ring-blue-500/50 ring-offset-2 ring-offset-zinc-950 transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-blue-500/70 flex items-center justify-center gap-2"
            >
              {isLoggingIn ? "Logging in..." : "Log in"}
            </button>
            {state.error && (
              <p className="text-red-500 text-sm mt-2">{state.error}</p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
