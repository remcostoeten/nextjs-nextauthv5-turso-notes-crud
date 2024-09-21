"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { TooltipProvider } from "../ui";

export default function Providers({ children }: PageProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange={false}
    >
      <TooltipProvider>
        {children}
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
  );
}
