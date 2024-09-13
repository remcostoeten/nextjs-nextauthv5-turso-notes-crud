'use client'

import { Button } from "@/components/ui/button"
import { Menu, X } from 'lucide-react'
import { signOut, useSession } from "next-auth/react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const routes = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Docs', path: '/docs' },
]

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const pathname = usePathname()
    const { data: session, status } = useSession()

    const isLoading = status === "loading"

    return (
        <header className="bg-zinc-950 text-white mb-4 border-b border-neutral-900" >
            <nav className="mx-auto flex max-w-7xl items-center justify-between py-2 px-6 " aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <svg className="h-4 w-auto" viewBox="0 0 76 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="white" />
                        </svg>
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Menu className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {routes.map((route) => (
                        <Link
                            key={route.name}
                            href={route.path}
                            className={`text-sm font-semibold leading-6 ${pathname === route.path ? 'text-white' : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            {route.name}
                        </Link>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : session ? (
                        <>
                            <span className="text-sm font-semibold leading-6">Welcome, {session.user?.name}</span>
                            <Button onClick={() => signOut()} variant="ghost" className="text-sm font-semibold leading-6">
                                Sign out
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button asChild variant="ghost" className="text-sm font-semibold leading-6">
                                <Link href="/login">Log in</Link>
                            </Button>
                            <Button asChild className="text-sm font-semibold leading-6 bg-white text-black hover:bg-gray-200">
                                <Link href="/signup">Sign up</Link>
                            </Button>
                        </>
                    )}
                </div>
            </nav>
            {/* Mobile menu, show/hide based on menu open state. */}
            <div className={`lg:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`} role="dialog" aria-modal="true">
                {/* Background backdrop, show/hide based on slide-over state. */}
                <div className="fixed inset-0 z-50"></div>
                <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <svg className="h-8 w-auto" viewBox="0 0 76 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="white" />
                            </svg>
                        </Link>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-white"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <X className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {routes.map((route) => (
                                    <Link
                                        key={route.name}
                                        href={route.path}
                                        className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${pathname === route.path ? 'text-white bg-gray-800' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                            }`}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {route.name}
                                    </Link>
                                ))}
                            </div>
                            <div className="py-6">
                                {isLoading ? (
                                    <div>Loading...</div>
                                ) : session ? (
                                    <>
                                        <span className="block px-3 py-2 text-base font-semibold leading-7 text-white">Welcome, {session.user?.name}</span>
                                        <button
                                            onClick={() => signOut()}
                                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-400 hover:bg-gray-800 hover:text-white"
                                        >
                                            Sign out
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href="/login"
                                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-400 hover:bg-gray-800 hover:text-white"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href="/signup"
                                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white bg-gray-800 hover:bg-gray-700"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Sign up
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
