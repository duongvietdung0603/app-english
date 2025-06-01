"use client"
import { useTranslations } from "next-intl"

const SentenceTranslationPage = () => {
  const t = useTranslations("SentenceTranslation")

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
      {/* Add your sentence translation practice components here */}
    </div>
  )
}

export default SentenceTranslationPage
