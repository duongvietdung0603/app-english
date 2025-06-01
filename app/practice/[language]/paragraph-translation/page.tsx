"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, CheckCircle, XCircle, Lightbulb } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useParams } from "next/navigation"

const paragraphData = {
  english: {
    title: "Một ngày của tôi",
    sentences: [
      {
        vietnamese: "Tôi thức dậy lúc 6 giờ sáng.",
        correct: "I wake up at 6 AM.",
        hints: ["'thức dậy' là 'wake up'", "Sử dụng 'at' cho thời gian cụ thể"],
      },
      {
        vietnamese: "Sau đó tôi đánh răng và rửa mặt.",
        correct: "Then I brush my teeth and wash my face.",
        hints: ["'đánh răng' là 'brush teeth'", "'rửa mặt' là 'wash face'"],
      },
      {
        vietnamese: "Tôi ăn sáng với gia đình.",
        correct: "I have breakfast with my family.",
        hints: ["'ăn sáng' là 'have breakfast'", "'với' là 'with'"],
      },
      {
        vietnamese: "Sau đó tôi đi làm bằng xe buýt.",
        correct: "Then I go to work by bus.",
        hints: ["'đi làm' là 'go to work'", "'bằng xe buýt' là 'by bus'"],
      },
    ],
  },
  japanese: {
    title: "私の一日",
    sentences: [
      {
        vietnamese: "Tôi thức dậy lúc 6 giờ sáng.",
        correct: "私は朝6時に起きます。",
        hints: ["私 (watashi) = tôi", "起きます (okimasu) = thức dậy"],
      },
      {
        vietnamese: "Sau đó tôi đánh răng và rửa mặt.",
        correct: "それから歯を磨いて、顔を洗います。",
        hints: ["それから = sau đó", "歯を磨く = đánh răng"],
      },
      {
        vietnamese: "Tôi ăn sáng với gia đình.",
        correct: "家族と朝ごはんを食べます。",
        hints: ["家族 (kazoku) = gia đình", "朝ごはん = bữa sáng"],
      },
      {
        vietnamese: "Sau đó tôi đi làm bằng xe buýt.",
        correct: "それからバスで会社に行きます。",
        hints: ["バス = xe buýt", "会社 (kaisha) = công ty"],
      },
    ],
  },
}

export default function ParagraphTranslationPage() {
  const params = useParams()
  const language = params.language as string
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [completedSentences, setCompletedSentences] = useState<Set<number>>(new Set())

  const paragraphInfo = paragraphData[language as keyof typeof paragraphData] || paragraphData.english
  const currentSentence = paragraphInfo.sentences[currentSentenceIndex]
  const progress = (completedSentences.size / paragraphInfo.sentences.length) * 100

  const checkAnswer = () => {
    const correct = userAnswer.trim().toLowerCase() === currentSentence.correct.toLowerCase()
    setIsCorrect(correct)
    setShowResult(true)
    if (correct) {
      setCompletedSentences((prev) => new Set([...prev, currentSentenceIndex]))
    }
  }

  const nextSentence = () => {
    if (currentSentenceIndex < paragraphInfo.sentences.length - 1) {
      setCurrentSentenceIndex(currentSentenceIndex + 1)
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
              Dịch đoạn văn sang {languageNames[language as keyof typeof languageNames]}
            </h1>
          </div>
          <div className="text-sm text-gray-600">
            Câu {currentSentenceIndex + 1} / {paragraphInfo.sentences.length}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Tiến độ dịch đoạn văn</span>
            <span className="text-sm text-gray-600">
              {completedSentences.size}/{paragraphInfo.sentences.length} câu hoàn thành
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Paragraph Overview */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-center">{paragraphInfo.title}</CardTitle>
            <CardDescription className="text-center">
              Dịch từng câu trong đoạn văn sau sang {languageNames[language as keyof typeof languageNames]}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {paragraphInfo.sentences.map((sentence, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${
                    index === currentSentenceIndex
                      ? "bg-blue-50 border-blue-200"
                      : completedSentences.has(index)
                        ? "bg-green-50 border-green-200"
                        : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-sm font-medium mr-2">Câu {index + 1}:</span>
                    <span className={index === currentSentenceIndex ? "font-medium" : ""}>{sentence.vietnamese}</span>
                    {completedSentences.has(index) && <CheckCircle className="h-4 w-4 text-green-600 ml-auto" />}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Current Sentence Translation */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-center">Dịch câu {currentSentenceIndex + 1}:</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Current Vietnamese sentence */}
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
                    {isCorrect ? "Chính xác! Chuyển sang câu tiếp theo." : "Chưa chính xác, hãy thử lại."}
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
                  {isCorrect && currentSentenceIndex < paragraphInfo.sentences.length - 1 && (
                    <Button onClick={nextSentence}>Câu tiếp theo →</Button>
                  )}
                  {isCorrect && currentSentenceIndex === paragraphInfo.sentences.length - 1 && (
                    <Button onClick={() => (window.location.href = "/dashboard")}>Hoàn thành đoạn văn</Button>
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
