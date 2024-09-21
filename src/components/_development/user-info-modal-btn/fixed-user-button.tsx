'use client'

import { Button } from '@/components/ui/button'
import { getUserInfo } from '@/core/server/actions'
import { User } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { UserInfoModal } from './user-info-modal'

export function UserInfoButton(): JSX.Element {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const userInfo = await getUserInfo()
                setIsAuthenticated(!!userInfo)
            } catch (error) {
                console.error('Error checking authentication:', error)
                setIsAuthenticated(false)
            }
        }
        checkAuth()
    }, [])

    const handleClick = () => {
        if (isAuthenticated === true) {
            setIsOpen(true)
        } else if (isAuthenticated === false) {
            toast.custom('Must be logged in to view user information.', {
                icon: 'confused',
            })
        }
        // If isAuthenticated is null, do nothing (still loading)
    }

    if (isAuthenticated === null) {
        return null
    }

    return (
        <>
            <Button
                variant="outline"
                size="icon"
                className={`fixed bg-avatar hover:opacity-100 hover:scale-110 hover:rotate-6 active:scale-90 active:translate-y-3 opacity-80 border-outline bottom-4 right-5 rounded-full size-10 transition-all duration-300 ${
                    isAuthenticated
                        ? 'shadow-[0_0_15px_rgba(0,255,0,0.5)] hover:shadow-[0_0_20px_rgba(0,255,0,0.7)]'
                        : ''
                }`}
                onClick={handleClick}
            >
                <User
                    className={`size-5 text-subtitle ${isAuthenticated ? 'text-green-500' : ''}`}
                />
            </Button>
            {isAuthenticated && (
                <UserInfoModal isOpen={isOpen} setIsOpen={setIsOpen} />
            )}
        </>
    )
}
