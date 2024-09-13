import Header from "@/components/base/layout/header/header";
import Providers from "@/components/base/provider-wrapper";
import { geistMono, geistSans } from "@/core/config/fonts/fonts";
import { metadata } from "@/core/config/metadata/metadata.root-layout";
import "@/styles/app.css";
import { auth } from "auth";

export { metadata };

const BODY_CLASS =
  "bg-gradient-to-br from-bg-body via-bg-section-lighter to-bg-body";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className={`flex flex-col min-h-full text-white ${BODY_CLASS}`}>
        <Providers session={session}>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
