import { UserInfoButton } from '@/components/_development/user-info-modal-btn/fixed-user-button'
import Providers from '@/components/base/provider-wrapper'
import '@/styles/app.scss'
import { roboto_mono } from '../core/config/fonts/fonts'
import { metadata } from '../core/config/metadata/metadata.root-layout'
import { DropdownNavigation } from '@/components/elements/DropdownNavigation'

export { metadata }

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html
            lang="en"
            color-scheme="dark"
            className={`${roboto_mono.className}`}
            suppressHydrationWarning
        >
            <body className="dark:bg-body">
                <Providers>
                    <DropdownNavigation />
                    {children}
                    <UserInfoButton />
                </Providers>
            </body>
        </html>
    )
}
