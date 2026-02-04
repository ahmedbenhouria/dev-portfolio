import type { Metadata } from 'next'
import { Fira_Code, Inter, Manrope, Oswald, Spectral } from 'next/font/google'
import './globals.css'

const oswald = Oswald({
  variable: '--font-oswald',
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700']
})

const spectral = Spectral({
  variable: '--font-spectral',
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800']
})

const fira = Fira_Code({
  variable: '--font-fira',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800']
})

export const metadata: Metadata = {
  title: 'Ahmed Ben Houria',
  description: 'This is my portfolio!'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${oswald.variable} ${spectral.variable} ${fira.variable} ${manrope.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
