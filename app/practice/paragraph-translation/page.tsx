"use client"

import { useTranslations } from "next-intl"

export default function ParagraphTranslationPage() {
  const t = useTranslations("ParagraphTranslationPage")

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
      {/* Add more content here as needed */}
    </div>
  )
}
