import type React from "react"
import type { Metadata } from "next"
import "../globals.css"
import { LanguageProvider } from "@/app/contexts/language-context"
import { ThemeProvider } from "@/components/theme-provider"
import { notFound } from "next/navigation"

const locales = ["en", "vi", "ja"]

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  title: "LinguaLearn - Language Learning Platform",
  description: "Learn English and Japanese with interactive translation methods",
  generator: "v0.dev",
}

interface RootLayoutProps {
  children: React.ReactNode
  params: { locale: string }
}

export default function RootLayout({ children, params: { locale } }: RootLayoutProps) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
    notFound()
  }

  return (
    <html lang={locale}>
      <body>
        <LanguageProvider locale={locale as "en" | "vi" | "ja"}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
