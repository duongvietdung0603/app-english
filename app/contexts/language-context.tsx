"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

type Language = "en" | "vi" | "ja"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  translations: Record<string, any>
  t: (key: string, params?: Record<string, string>) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: React.ReactNode
  locale: Language
}

export function LanguageProvider({ children, locale }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(locale)
  const [translations, setTranslations] = useState<Record<string, any>>({})
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    setLanguageState(locale)
  }, [locale])

  useEffect(() => {
    // Load translations for current language
    const loadTranslations = async () => {
      try {
        const response = await fetch(`/locales/${language}.json`)
        const data = await response.json()
        setTranslations(data)
      } catch (error) {
        console.error("Failed to load translations:", error)
        // Fallback to English
        if (language !== "en") {
          const fallbackResponse = await fetch("/locales/en.json")
          const fallbackData = await fallbackResponse.json()
          setTranslations(fallbackData)
        }
      }
    }

    loadTranslations()
  }, [language])

  const setLanguage = (newLanguage: Language) => {
    // Remove current locale from pathname and add new locale
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "") || "/"
    const newPath = `/${newLanguage}${pathWithoutLocale}`
    router.push(newPath)
  }

  const t = (key: string, params?: Record<string, string>): string => {
    const keys = key.split(".")
    let value = translations

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k]
      } else {
        return key // Return key if translation not found
      }
    }

    let result = typeof value === "string" ? value : key

    // Replace parameters if provided
    if (params) {
      Object.entries(params).forEach(([param, val]) => {
        result = result.replace(`{${param}}`, val)
      })
    }

    return result
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        translations,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

// Hook for easier translation access
export function useTranslation() {
  const { t } = useLanguage()
  return { t }
}
