import { Inter } from 'next/font/google';
import './globals.css';
import AuthGuard from './lib/authGuard';
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Rentalynk Admin',
  description: 'The rentalynk Admin back-Ofice',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthGuard children={children}/>
        </body>
    </html>
  )
}
