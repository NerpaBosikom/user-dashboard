import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import Footer from "@/components/users/Footer"
import { ReactNode } from "react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "User Manager",
  description: "Приложение для управления пользователями",
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ru" className={geistSans.variable}>
      <body className="flex flex-col min-h-screen bg-white">
        <main className="flex-grow container mx-auto p-4 max-w-6xl">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}