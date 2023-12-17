import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from './provider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

export const metadata = {
  title: 'My Travel Planner',
  description: 'Web app for personal travel planning',
  keywords: ['Next.js', 'React', 'JavaScript'],
  openGraph: {
    images: [
      {
        url: 'https://res.cloudinary.com/george-swift/image/upload/v1678975221/travelPlanner_ozytve.png',
        width: 1800,
        height: 1600,
        alt: 'Screenshot of my bucket list on the app'
      }
    ],
    locale: 'en-GB'
  },
  icons: {
    icon: [
      { url: '/favicon/favicon.ico' },
      { url: '/favicon/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon/favicon-32x32.png', type: 'image/png', sizes: '32x32' }
    ]
  },
  manifest: '/favicon/site.webmanifest'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
