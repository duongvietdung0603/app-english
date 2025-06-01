"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, CheckCircle, XCircle, Lightbulb } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useParams } from "next/navigation"

const sentenceData = {
  english: [
    {
      vietnamese: "Tôi đang học tiếng Anh.",
      correct: "I am learning English.",
      hints: ["Sử dụng thì hiện tại tiếp diễn", "Chủ ngữ là 'I'"],
    },
    {
      vietnamese: "Hôm nay trời đẹp quá.",
      correct: "The weather is beautiful today.",
      hints: ["'Trời' có thể dịch là 'weather'", "Sử dụng 'beautiful' cho 'đẹp'"],
    },
    {
      vietnamese: "Tôi muốn uống cà phê.",
      correct: "I want to drink coffee.",
      hints: ["Sử dụng 'want to' cho 'muốn'", "'uống' là 'drink'"],
    },
  ],
  japanese: [
    {
      vietnamese: "Tôi đang học tiếng Nhật.",
      correct: "私は日本語を勉強しています。",
      hints: ["私 (watashi) = tôi", "勉強 (benkyou) = học"],
    },
    {
      vietnamese: "Hôm nay trời đẹp quá.",
      correct: "今日はとてもいい天気です。",
      hints: ["今日 (kyou) = hôm nay", "いい天気 (ii tenki) = thời tiết đẹp"],
    },
    {
      vietnamese: "Tôi muốn uống cà phê.",
      correct: "コーヒーを飲みたいです。",
      hints: ["コーヒー (koohii) = cà phê", "飲みたい (nomitai) = muốn uống"],
    },
  ],
}

export default function SentenceTranslationPage() {
  const params = useParams()
  const language = params.language as string
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [completedSentences, setCompletedSentences] = useState<Set<number>>(new Set())

  const sentences = sentenceData[language as keyof typeof sentenceData] || sentenceData.english
  const currentSentence = sentences[currentIndex]
  const progress = (completedSentences.size / sentences.length) * 100

  const checkAnswer = () => {
    const correct = userAnswer.trim().toLowerCase() === currentSentence.correct.toLowerCase()
    setIsCorrect(correct)
    setShowResult(true)
    if (correct) {
      setCompletedSentences((prev) => new Set([...prev, currentIndex]))
    }
  }

  const nextSentence = () => {
    if (currentIndex < sentences.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setUserAnswer("")
      setShowResult(false)
      setShowHint(false)
    }
  }

  const tryAgain = () => {
    setUserAnswer("")
    setShowResult(false)
    setShowHint(false)
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
            <h1 className="text-xl font-semibold">
              Dịch câu sang {languageNames[language as keyof typeof languageNames]}
            </h1>
          </div>
          <div className="text-sm text-gray-600">
            {currentIndex + 1} / {sentences.length}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Tiến độ</span>
            <span className="text-sm text-gray-600">
              {completedSentences.size}/{sentences.length} câu hoàn thành
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Translation Exercise */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              Dịch câu sau sang {languageNames[language as keyof typeof languageNames]}:
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Vietnamese sentence */}
            <div className="text-center">
              <div className="text-xl font-semibold text-blue-600 bg-blue-50 p-4 rounded-lg">
                {currentSentence.vietnamese}
              </div>
            </div>

            {/* User input */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Câu dịch của bạn:</label>
              <Textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder={`Nhập câu dịch sang ${languageNames[language as keyof typeof languageNames]}...`}
                className="min-h-[100px]"
                disabled={showResult && isCorrect}
              />
            </div>

            {/* Hint */}
            {showHint && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Lightbulb className="h-5 w-5 text-yellow-600 mr-2" />
                  <span className="font-medium text-yellow-800">Gợi ý:</span>
                </div>
                <ul className="text-yellow-700 space-y-1">
                  {currentSentence.hints.map((hint, index) => (
                    <li key={index}>• {hint}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Result */}
            {showResult && (
              <div
                className={`border rounded-lg p-4 ${isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}
              >
                <div className="flex items-center mb-2">
                  {isCorrect ? (
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600 mr-2" />
                  )}
                  <span className={`font-medium ${isCorrect ? "text-green-800" : "text-red-800"}`}>
                    {isCorrect ? "Chính xác!" : "Chưa chính xác"}
                  </span>
                </div>
                {!isCorrect && (
                  <div className="text-red-700">
                    <strong>Đáp án đúng:</strong> {currentSentence.correct}
                  </div>
                )}
              </div>
            )}

            {/* Action buttons */}
            <div className="flex justify-center space-x-4">
              {!showResult && (
                <>
                  <Button variant="outline" onClick={() => setShowHint(!showHint)}>
                    <Lightbulb className="h-4 w-4 mr-2" />
                    {showHint ? "Ẩn gợi ý" : "Hiện gợi ý"}
                  </Button>
                  <Button onClick={checkAnswer} disabled={!userAnswer.trim()}>
                    Kiểm tra
                  </Button>
                </>
              )}

              {showResult && (
                <>
                  {!isCorrect && (
                    <Button variant="outline" onClick={tryAgain}>
                      Thử lại
                    </Button>
                  )}
                  {currentIndex < sentences.length - 1 && <Button onClick={nextSentence}>Câu tiếp theo →</Button>}
                  {currentIndex === sentences.length - 1 && isCorrect && (
                    <Button onClick={() => (window.location.href = "/dashboard")}>Hoàn thành</Button>
                  )}
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
