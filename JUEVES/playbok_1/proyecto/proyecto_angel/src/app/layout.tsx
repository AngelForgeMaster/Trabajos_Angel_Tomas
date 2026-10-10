import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import "@/app/globals.css";


export const metadata: Metadata = {
  title: 'manager stock',
  description: 'Desarrollado por juan penagos',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='es'>
      <body className='antialiased'>
        <ClerkProvider>
          {children}
        </ClerkProvider>

      </body>
    </html>
  )
}


