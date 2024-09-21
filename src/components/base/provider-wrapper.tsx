"use client";

import { toastIcons } from "@/core/types/toast-types";
import { ThemeProvider } from "next-themes";
import { toast, Toaster, ToastOptions } from "react-hot-toast";
import { TooltipProvider } from "../ui";

// Extend the ToastOptions type to include custom properties
interface CustomToastOptions extends ToastOptions {
  custom?: {
    fire?: {
      icon: string;
    };
  };
}

const customToast = Object.assign(toast, {
  custom: (message: string, options?: CustomToastOptions) => {
    return toast(message, {
      ...options,
      icon: options?.icon ? toastIcons[options.icon] : undefined,
    });
  },
});

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
          position="top-right"
          toastOptions={{
            duration: 5000,
            style: {
              right: "32px !important",
              background: "var(--bg-modal)",
              display: "flex",
              gap: "16px",
              transform: "translateX(-25px)",
              maxWidth: "550px",
              color: "var(--text-title)",
              border: "1px solid var(--border-outline)",
              padding: "16px",
              borderRadius: "8px",
              margin: "16px",
            },
          }}
        />
      </TooltipProvider>
    </ThemeProvider>
  );
}

// Export the custom toast function
export { customToast as toast };
