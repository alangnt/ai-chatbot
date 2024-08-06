import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import './globals.css'

import { Analytics } from "@vercel/analytics/react"

const fontHeading = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
})

const fontBody = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: "AI Easy Chat",
  description: "AI EasyChat is a game-changer. Clone the repo, follow a few steps, and boom - you've got an AI chatbot on your NextJS app !",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        className={cn(
          'antialiased',
          fontHeading.variable,
          fontBody.variable
        )}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
