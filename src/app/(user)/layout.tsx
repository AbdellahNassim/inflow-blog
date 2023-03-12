"use client"

import Banner from '@/components/Banner'
import Header from '@/components/Header'
import '../globals.css'
import { Rubik } from '@next/font/google'
import { SessionProvider } from "next-auth/react"
const rubik = Rubik({ subsets: ['latin'] })
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />

      <SessionProvider >
        <body className={`${rubik.className} max-w-7xl mx-auto`}>
          <Header />
          <Banner />
          {children}

        </body>
      </SessionProvider>
    </html>
  )
}
