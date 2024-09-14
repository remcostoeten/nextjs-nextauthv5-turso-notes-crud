import Layout from "@/components/base/layout/Layout";
import Providers from "@/components/base/provider-wrapper";
import { TextHoverEffectDemo } from "@/components/landing/footer-effect";
import { geistMono, geistSans } from "@/core/config/fonts/fonts";
import { metadata } from "@/core/config/metadata/metadata.root-layout";
import "@/styles/app.scss";

export { metadata };

const BODY_CLASS =
  "bg-gradient-to-br from-bg-body via-bg-section-lighter to-bg-body";

export default function RootLayout({ children }: PageProps) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className={`flex flex-col min-h-screen text-white ${BODY_CLASS}`}>
        <Providers session={undefined}>
          <Layout>
            {children}
            <TextHoverEffectDemo />
          </Layout>
        </Providers>
      </body>
    </html>
  );
}
