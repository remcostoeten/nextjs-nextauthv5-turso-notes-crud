import Providers from "@/components/base/provider-wrapper";
import { geistMono, geistSans } from "@/core/config/fonts/fonts";
import "@/styles/app.scss";
import { metadata } from "./(marketing)/layout";

export { metadata };

export default function RootLayout({ children }: PageProps) {
  return (
    <html
      lang="en"
      color-scheme="dark"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Providers session={undefined}>{children}</Providers>
      </body>
    </html>
  );
}
