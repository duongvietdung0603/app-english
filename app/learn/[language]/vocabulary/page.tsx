"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Volume2, BookOpen, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useParams } from "next/navigation"

const vocabularyData = {
  english: [
    { word: "Hello", translation: "Xin chào", pronunciation: "/həˈloʊ/", example: "Hello, how are you?" },
    { word: "Thank you", translation: "Cảm ơn", pronunciation: "/θæŋk juː/", example: "Thank you for your help." },
    {
      word: "Good morning",
      translation: "Chào buổi sáng",
      pronunciation: "/ɡʊd ˈmɔːrnɪŋ/",
      example: "Good morning, everyone!",
    },
    { word: "Beautiful", translation: "Đẹp", pronunciation: "/ˈbjuːtɪfəl/", example: "The sunset is beautiful." },
    {
      word: "Important",
      translation: "Quan trọng",
      pronunciation: "/ɪmˈpɔːrtənt/",
      example: "This is very important.",
    },
  ],
  japanese: [
    { word: "こんにちは", translation: "Xin chào", pronunciation: "Konnichiwa", example: "こんにちは、元気ですか？" },
    { word: "ありがとう", translation: "Cảm ơn", pronunciation: "Arigatou", example: "ありがとうございます。" },
    { word: "おはよう", translation: "Chào buổi sáng", pronunciation: "Ohayou", example: "おはようございます！" },
    { word: "きれい", translation: "Đẹp", pronunciation: "Kirei", example: "この花はきれいです。" },
    { word: "大切", translation: "Quan trọng", pronunciation: "Taisetsu", example: "これは大切なことです。" },
  ],
}

export default function VocabularyPage() {
  const params = useParams()
  const language = params.language as string
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showTranslation, setShowTranslation] = useState(false)
  const [learnedWords, setLearnedWords] = useState<Set<number>>(new Set())

  const vocabulary = vocabularyData[language as keyof typeof vocabularyData] || vocabularyData.english
  const currentWord = vocabulary[currentIndex]
  const progress = (learnedWords.size / vocabulary.length) * 100

  const handleNext = () => {
    if (currentIndex < vocabulary.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setShowTranslation(false)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setShowTranslation(false)
    }
  }

  const markAsLearned = () => {
    setLearnedWords((prev) => new Set([...prev, currentIndex]))
  }

  const languageNames = {
    english: "Tiếng Anh",
    japanese: "Tiếng Nhật",
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-semibold">
                Học từ vựng {languageNames[language as keyof typeof languageNames]}
              </h1>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            {currentIndex + 1} / {vocabulary.length}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Tiến độ học tập</span>
            <span className="text-sm text-gray-600">
              {learnedWords.size}/{vocabulary.length} từ đã học
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Vocabulary Card */}
        <Card className="mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-blue-600 mb-4">{currentWord.word}</CardTitle>
            <CardDescription className="text-lg">{currentWord.pronunciation}</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <Button variant="outline" size="lg" className="mb-4" onClick={() => setShowTranslation(!showTranslation)}>
              {showTranslation ? "Ẩn nghĩa" : "Hiện nghĩa"}
            </Button>

            {showTranslation && (
              <div className="space-y-4">
                <div className="text-2xl font-semibold text-green-600">{currentWord.translation}</div>
                <div className="text-gray-600 italic">Ví dụ: {currentWord.example}</div>
              </div>
            )}

            <div className="flex justify-center space-x-4 pt-4">
              <Button variant="outline" onClick={() => {}}>
                <Volume2 className="h-4 w-4 mr-2" />
                Phát âm
              </Button>
              {!learnedWords.has(currentIndex) && (
                <Button onClick={markAsLearned} className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Đã học
                </Button>
              )}
              {learnedWords.has(currentIndex) && (
                <Button variant="outline" className="text-green-600 border-green-600">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Đã học
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={currentIndex === 0}>
            ← Từ trước
          </Button>
          <Button onClick={handleNext} disabled={currentIndex === vocabulary.length - 1}>
            Từ tiếp theo →
          </Button>
        </div>
      </div>
    </div>
  )
}
