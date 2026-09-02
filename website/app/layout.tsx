import type { Metadata } from "next";
import { AuthProvider } from "@/components/AuthProvider";
import { SiteChrome } from "@/components/SiteChrome";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://fettle.marginalutility.dev"),
  title: { default: "Fettle: review the work, not just the diff", template: "%s · Fettle" },
  description: "A native Mac review desk for local code changes, agent turns, pull requests, and visual evidence.",
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <SiteChrome>{children}</SiteChrome>
        </AuthProvider>
      </body>
    </html>
  );
}
