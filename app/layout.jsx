import "./globals.css"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { StoreProvider } from "../stores/StoreProvider"
import { Toaster } from "@/components/ui/sonner"
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper" // 👈 new wrapper

const geist = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata = {
  title: "Digital Marketplace",
  description: "Buy and sell digital products",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geist.className} ${geistMono.className} font-sans antialiased`}>
        <StoreProvider>
          <ClientLayoutWrapper>
            {children}
          </ClientLayoutWrapper>
        </StoreProvider>
        <Toaster position="top-right" />
        <Analytics />
      </body>
    </html>
  )
}
