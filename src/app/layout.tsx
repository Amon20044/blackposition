import type { Metadata } from "next";
import { Montserrat } from 'next/font/google'
import "./globals.css";
import { PostHogProvider } from "../component/PostHogProvider";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
const inter = Montserrat({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "BlackPosition",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <PostHogProvider>
        <SpeedInsights/>
          <Analytics/>
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}
