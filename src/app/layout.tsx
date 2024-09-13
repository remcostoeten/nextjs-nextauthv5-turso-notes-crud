import Header from "@/components/header"
import type { Metadata } from "next"
import { SessionProvider } from "next-auth/react"
import { Inter } from "next/font/google"
import { Toaster } from "react-hot-toast"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Your App Name",
  description: "A modern web application built with Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SessionProvider>
      <html lang="en" className="h-full">
        <body className={`${inter.className} flex flex-col min-h-full bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white`}>
          <Header />
          <main className="flex-grow pt-24 ">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
          <footer className="mt-auto py-6 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Your Company Name. All rights reserved.
          </footer>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: 'rgba(0, 0, 0, 0.8)',
                color: '#fff',
                borderRadius: '8px',
                padding: '12px 16px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              },
              duration: 5000,
            }}
          />
        </body>
      </html>
    </SessionProvider>
  )
}
