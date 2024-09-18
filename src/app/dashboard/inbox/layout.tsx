import type { Metadata, Viewport } from "next";
import { ReactNode } from "react";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Inbox",
  description: "View and manage your messages",
};

export default function InboxLayout({ children }: { children: ReactNode }) {
  return <div className="inbox-layout">{children}</div>;
}
