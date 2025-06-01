"use client"

import { useTranslation } from "@/app/contexts/language-context"

import { Button } from "@/components/ui/button"

export default function TranslationPage() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">{t("translation.title")}</h1>

      <div className="mt-6">
        <p className="text-lg">{t("translation.translate_sentence")}</p>
        <input
          type="text"
          placeholder={t("translation.your_translation")}
          className="border border-gray-300 rounded-md px-4 py-2 mt-2 w-full max-w-md"
        />
        <Button className="mt-4">{t("translation.send")}</Button>
      </div>

      <div className="mt-8 flex space-x-4">
        <span>{t("translation.correct")}</span>
        <span>{t("translation.try_again")}</span>
      </div>
    </div>
  )
}
