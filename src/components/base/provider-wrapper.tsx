"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { TooltipProvider } from "../ui/tooltip";

type ProviderProps = {
  children: React.ReactNode;
  session: any; // Replace 'any' with your actual session type if available
};

export default function Providers({ children, session }: ProviderProps) {
  return (
    <SessionProvider session={session}>
      <TooltipProvider>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            className: "",
            duration: 5000,
            style: {
              background: "#363636",
              color: "#fff",
            },
          }}
        />
      </TooltipProvider>
    </SessionProvider>
  );
}
