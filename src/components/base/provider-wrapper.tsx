"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import { TooltipProvider } from "../ui/tooltip";

type ProviderProps = {
  children: React.ReactNode;
  session: any;
};

export default function Providers({ children, session }: ProviderProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        disableTransitionOnChange={false}
      >
        <TooltipProvider>
          <NextTopLoader
            color="var(--brand)"
            initialPosition={0.38}
            height={3}
            showSpinner={false}
            easing="in-ease-out"
            speed={200}
            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
            template='<div class="bar" role="bar"><div class="peg"></div></div> 
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
          />
          {children}
          {/* <Toaster
            position='bottom-right'
            toastOptions={{
              duration: 4444,
              style: {
                background: "#040404",
                color: "#909090",
                border: "1px solid #131313",
              },
            }}
          /> */}
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 5000,
              style: {
                background: "var(--bg-modal)",
                color: "var(--text-title)",
                border: "1px solid var(--border-outline)",
                padding: "16px",
                borderRadius: "8px",
              },
              success: {
                icon: "✅",
              },
              error: {
                icon: "❌",
              },
              loading: {
                icon: "⏳",
              },
            }}
          />

        </TooltipProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
