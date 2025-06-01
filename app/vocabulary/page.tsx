"use client"

import { useTranslation } from "@/app/contexts/language-context"

export default function VocabularyPage() {
  const { t } = useTranslation()

  return (
    <div>
      <h1>{t("vocabulary.title")}</h1>
      <h2>{t("vocabulary.new_words")}</h2>
      <table>
        <thead>
          <tr>
            <th>{t("vocabulary.word")}</th>
            <th>{t("vocabulary.pronunciation")}</th>
            <th>{t("vocabulary.definition")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Example Word</td>
            <td>
              <span>{t("vocabulary.pronunciation")}</span>
            </td>
            <td>
              <span>{t("vocabulary.definition")}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
