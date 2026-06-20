import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Calendrier',
  description: 'Application de calendrier mensuel',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${geist.className} h-full antialiased`}>
      <body className="min-h-full bg-gray-50">{children}</body>
    </html>
  )
}
