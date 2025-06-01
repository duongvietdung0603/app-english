"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

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
  defaultLanguage?: Language
}

export function LanguageProvider({ children, defaultLanguage = "en" }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(defaultLanguage)
  const [translations, setTranslations] = useState<Record<string, any>>({})

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["en", "vi", "ja"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

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
    // Save language to localStorage
    localStorage.setItem("language", language)
  }, [language])

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

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
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
