import type { Metadata, Viewport } from "next";
import Layout from "@/components/layout";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    template: "%s | My Blog",
    default: "My Blog",
  },
  description:
    "I write about web development, programming, cyber security and trading.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Layout>
          {children}
          <div id="notifications" />
        </Layout>
      </body>
    </html>
  );
}
