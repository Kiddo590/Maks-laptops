import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Marks Electronics — Kenya\'s Premier Electronics Store',
  description: 'Shop the latest phones, laptops, TVs, cameras and more. Best prices in Kenya.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
