"use client";

import { Input } from "@/components/ui/input";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import ProviderButton from "./login.providers-buttons";

type LoginGridWithProvidersProps = {
  enabledProviders?: string[];
  onSubmit?: (email: string, password: string) => void;
  onProviderLogin?: (provider: string) => void;
};

export default function LoginGridWithProviders({
  enabledProviders = ["google", "twitter", "github"],
  onSubmit,
  onProviderLogin,
}: LoginGridWithProvidersProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(email, password);
  };

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center sm:px-4 relative">
      <div className="absolute top-0 z-[0] h-screen w-screen bg-purple-950/10 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className="w-full space-y-6 text-gray-600 sm:max-w-md md:max-w-xl lg:max-w-xl px-5 py-10 rounded-2xl transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset]">
        <LoginHeader />
        <div className="bg-transparent shadow p-4 py-6 space-y-8 sm:p-6 sm:rounded-lg">
          <ProviderButtons
            providers={enabledProviders}
            onProviderLogin={onProviderLogin}
          />
          <Divider />
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            onSubmit={handleSubmit}
          />
        </div>
        <ForgotPassword />
      </div>
    </main>
  );
}

function LoginHeader() {
  return (
    <div className="text-center">
      <img
        src="https://farmui.com/logo.svg"
        width={100}
        className="mx-auto rounded-full"
      />
      <div className="mt-5 space-y-2">
        <h3 className="text-gray-200 text-2xl font-normal sm:text-3xl tracking-tighter font-geist">
          Log in to your account
        </h3>
        <p className="text-gray-400">
          Don't have an account?{" "}
          <a
            href="javascript:void(0)"
            className="font-medium text-purple-600 hover:text-purple-500"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

function ProviderButtons({
  providers,
  onProviderLogin,
}: {
  providers: string[];
  onProviderLogin?: (provider: string) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-x-3">
      {providers.map((providerKey) => (
        <ProviderButton
          key={providerKey}
          provider={providers[providerKey as keyof typeof providers]}
          onClick={() => onProviderLogin?.(providerKey)}
        />
      ))}
    </div>
  );
}

function Divider() {
  return (
    <div className="relative">
      <span className="block w-full h-px bg-transparent"></span>
      <p className="inline-block w-fit text-sm text-gray-200 px-2 absolute -top-2 inset-x-0 mx-auto">
        Or continue with
      </p>
    </div>
  );
}

function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  onSubmit,
}: {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label className="font-medium text-gray-100/50 font-geist">Email</label>
        <Input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-2 px-3 py-6 text-gray-500 bg-transparent outline-none border focus:border-purple-600 shadow-sm rounded-lg"
        />
      </div>
      <div>
        <label className="font-medium text-gray-100/50 font-geist">
          Password
        </label>
        <Input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mt-2 px-3 py-6 text-gray-500 bg-transparent outline-none border focus:border-purple-600 shadow-sm rounded-lg"
        />
      </div>
      <button className="w-full group px-4 py-4 font-geist tracking-tighter text-xl text-white font-medium bg-purple-200/10 transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset] hover:bg-transparent/10 active:bg-purple-600 rounded-lg duration-150">
        Sign in
        <ChevronRight className="inline-flex justify-center items-center w-4 h-4 ml-2 group-hover:translate-x-1 duration-300" />
      </button>
    </form>
  );
}

function ForgotPassword() {
  return (
    <div className="text-center">
      <a href="javascript:void(0)" className="hover:text-purple-600">
        Forgot password?
      </a>
    </div>
  );
}
