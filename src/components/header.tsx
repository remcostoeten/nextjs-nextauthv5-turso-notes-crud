'use client'

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, FileText, Home, LayoutDashboard, LogOut, Menu, Settings, User, X } from 'lucide-react'
import { signOut, useSession } from "next-auth/react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

type Route = {
    name: string
    path: string
    icon: React.ReactNode
}

const mainRoutes: Route[] = [
    { name: 'Home', path: '/', icon: <Home className="w-4 h-4" /> },
    { name: 'Docs', path: '/docs', icon: <FileText className="w-4 h-4" /> },
]

const dashboardRoutes: Route[] = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'Profile', path: '/dashboard/profile', icon: <User className="w-4 h-4" /> },
    { name: 'Settings', path: '/dashboard/settings', icon: <Settings className="w-4 h-4" /> },
]

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const pathname = usePathname()
    const { data: session } = useSession()
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <motion.header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 bg-zinc-950 border-b border-border backdrop-blur-sm shadow-md transition-all duration-300",
                scrolled ? "py-2" : "py-4"
            )}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5">
                        <motion.div
                            className={cn(
                                "text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 transition-all duration-300",
                                scrolled ? "scale-90" : "scale-100"
                            )}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            YourLogo
                        </motion.div>
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <Button variant="ghost" onClick={() => setMobileMenuOpen(true)}>
                        <span className="sr-only">Open main menu</span>
                        <Menu className="h-6 w-6" aria-hidden="true" />
                    </Button>
                </div>
                <div className="hidden lg:flex lg:gap-x-8">
                    {mainRoutes.map((route) => (
                        <Link key={route.name} href={route.path}>
                            <motion.div
                                className={cn(
                                    "text-sm font-semibold leading-6 transition-colors duration-200 flex items-center space-x-1",
                                    pathname === route.path ? "text-white" : "text-zinc-400 hover:text-white"
                                )}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {route.icon}
                                <span>{route.name}</span>
                            </motion.div>
                        </Link>
                    ))}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button variant="ghost" className="text-sm font-semibold leading-6">
                                    Dashboard <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </motion.div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 bg-zinc-950/90 backdrop-blur-sm border-zinc-800">
                            {dashboardRoutes.map((route) => (
                                <DropdownMenuItem key={route.name} asChild>
                                    <Link href={route.path} className="w-full">
                                        <motion.div
                                            className="flex items-center space-x-2"
                                            whileHover={{ x: 5 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                        >
                                            {route.icon}
                                            <span>{route.name}</span>
                                        </motion.div>
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    {session ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button variant="ghost" className="text-sm font-semibold leading-6">
                                        <User className="mr-2 h-4 w-4" /> {session.user?.name}
                                    </Button>
                                </motion.div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 bg-zinc-950/90 backdrop-blur-sm border-zinc-800">
                                <DropdownMenuItem asChild>
                                    <Link href="/dashboard/profile" className="w-full">
                                        <motion.div
                                            className="flex items-center space-x-2"
                                            whileHover={{ x: 5 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                        >
                                            <User className="h-4 w-4" /> <span>Profile</span>
                                        </motion.div>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-zinc-800" />
                                <DropdownMenuItem onClick={() => signOut()}>
                                    <motion.div
                                        className="flex items-center space-x-2"
                                        whileHover={{ x: 5 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    >
                                        <LogOut className="h-4 w-4" /> <span>Sign out</span>
                                    </motion.div>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link href="/login">
                            <motion.div
                                className="text-sm font-semibold leading-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Log in <span aria-hidden="true">→</span>
                            </motion.div>
                        </Link>
                    )}
                </div>
            </nav>
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className="lg:hidden fixed inset-0 z-50 border-b  backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto px-6 py-6 sm:max-w-sm"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            <div className="flex items-center justify-between">
                                <Link href="/" className="-m-1.5 p-1.5">
                                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">YourLogo</span>
                                </Link>
                                <Button variant="ghost" onClick={() => setMobileMenuOpen(false)}>
                                    <span className="sr-only">Close menu</span>
                                    <X className="h-6 w-6" aria-hidden="true" />
                                </Button>
                            </div>
                            <div className="mt-6 flow-root">
                                <div className="-my-6 divide-y divide-zinc-500/25">
                                    <div className="space-y-2 py-6">
                                        {mainRoutes.concat(dashboardRoutes).map((route) => (
                                            <Link
                                                key={route.name}
                                                href={route.path}
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-zinc-800"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                <motion.div
                                                    className="flex items-center space-x-2"
                                                    whileHover={{ x: 5 }}
                                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                                >
                                                    {route.icon}
                                                    <span>{route.name}</span>
                                                </motion.div>
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="py-6">
                                        {session ? (
                                            <>
                                                <div className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white">
                                                    {session.user?.name}
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    className="mt-2 w-full justify-start"
                                                    onClick={() => {
                                                        signOut()
                                                        setMobileMenuOpen(false)
                                                    }}
                                                >
                                                    <LogOut className="mr-2 h-4 w-4" /> Sign out
                                                </Button>
                                            </>
                                        ) : (
                                            <Link
                                                href="/login"
                                                className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-zinc-800"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                <motion.div
                                                    whileHover={{ x: 5 }}
                                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                                >
                                                    Log in
                                                </motion.div>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    )
}
