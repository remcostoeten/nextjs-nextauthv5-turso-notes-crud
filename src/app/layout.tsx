import Providers from '@/components/base/provider-wrapper'
import '@/styles/app.scss'
import Navbar from '../components/landing/navbar/navbar'
import { roboto_mono } from '../core/config/fonts/fonts'
import { metadata } from '../core/config/metadata/metadata.root-layout'

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
            <body>
                <Providers>
                    <Navbar />
                    {children}
                </Providers>
            </body>
        </html>
    )
}
