"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Lightbulb, Send, Target, Flame } from "lucide-react"
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
    {
      vietnamese: "Cô ấy là một giáo viên.",
      correct: "She is a teacher.",
      hints: ["'Cô ấy' là 'She'", "Sử dụng 'a' trước nghề nghiệp"],
    },
    {
      vietnamese: "Chúng tôi sống ở Việt Nam.",
      correct: "We live in Vietnam.",
      hints: ["'Chúng tôi' là 'We'", "Sử dụng 'in' cho tên quốc gia"],
    },
    {
      vietnamese: "Anh ấy thích đọc sách.",
      correct: "He likes reading books.",
      hints: ["'Anh ấy' là 'He'", "'thích' là 'like'"],
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
    {
      vietnamese: "Cô ấy là một giáo viên.",
      correct: "彼女は先生です。",
      hints: ["彼女 (kanojo) = cô ấy", "先生 (sensei) = giáo viên"],
    },
    {
      vietnamese: "Chúng tôi sống ở Việt Nam.",
      correct: "私たちはベトナムに住んでいます。",
      hints: ["私たち (watashitachi) = chúng tôi", "住む (sumu) = sống"],
    },
    {
      vietnamese: "Anh ấy thích đọc sách.",
      correct: "彼は本を読むのが好きです。",
      hints: ["彼 (kare) = anh ấy", "好き (suki) = thích"],
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
  const [credits, setCredits] = useState(8)
  const [points, setPoints] = useState(95)
  const [streak, setStreak] = useState(5)

  const sentences = sentenceData[language as keyof typeof sentenceData] || sentenceData.english
  const currentSentence = sentences[currentIndex]
  const progress = ((currentIndex + 1) / sentences.length) * 100

  const checkAnswer = () => {
    const correct = userAnswer.trim().toLowerCase() === currentSentence.correct.toLowerCase()
    setIsCorrect(correct)
    setShowResult(true)
    if (correct) {
      setCompletedSentences((prev) => new Set([...prev, currentIndex]))
      setPoints(points + 15)
      setCredits(credits + 1)
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

  const renderCompactSentenceList = () => {
    return (
      <div className="flex flex-wrap gap-2">
        {sentences.map((_, index) => {
          let bgColor = "bg-gray-700"
          let textColor = "text-gray-400"

          if (completedSentences.has(index)) {
            bgColor = "bg-green-500"
            textColor = "text-white"
          } else if (index === currentIndex) {
            bgColor = "bg-pink-500"
            textColor = "text-white"
          }

          return (
            <div
              key={index}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${bgColor} ${textColor} transition-all duration-300`}
            >
              {completedSentences.has(index) ? "✓" : index + 1}
            </div>
          )
        })}
      </div>
    )
  }

  const languageNames = {
    english: "Tiếng Anh",
    japanese: "Tiếng Nhật",
  }

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">
      {/* Header - Fixed height */}
      <header className="bg-gray-800 border-b border-gray-700 flex-shrink-0">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Quit
                </Button>
              </Link>
              <h1 className="text-xl font-bold text-yellow-400">
                Dịch câu sang {languageNames[language as keyof typeof languageNames]}
              </h1>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-xs">
                  $
                </div>
                <span>{credits}</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center text-black text-xs">
                  ⭐
                </div>
                <span>{points}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Flame className="h-4 w-4 text-orange-500" />
                <span>{streak}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar - Fixed height */}
      <div className="bg-gray-800 px-4 py-2 flex-shrink-0">
        <div className="container mx-auto">
          <Progress value={progress} className="h-2 bg-gray-700">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </Progress>
        </div>
      </div>

      {/* Main Content - Flexible height */}
      <div className="flex-1 container mx-auto px-4 py-4 grid grid-cols-4 gap-4 min-h-0">
        {/* Left: Sentence List - Compact */}
        <div className="col-span-1">
          <Card className="bg-gray-800 border-gray-700 h-full">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3 text-sm">
                Progress ({completedSentences.size}/{sentences.length})
              </h3>
              {renderCompactSentenceList()}

              {/* Accuracy */}
              <div className="mt-4 text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div className="text-lg font-bold text-green-400">
                  {Math.round((completedSentences.size / Math.max(currentIndex + 1, 1)) * 100)}%
                </div>
                <div className="text-xs text-gray-400">Accuracy</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Center: Main Translation Area */}
        <div className="col-span-2 flex flex-col">
          {/* Current Sentence */}
          <Card className="bg-gray-800 border-gray-700 mb-4 flex-shrink-0">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-sm text-gray-400 mb-2">
                  Câu {currentIndex + 1}/{sentences.length}
                </div>
                <div className="text-xl font-medium text-pink-400 bg-pink-500/10 p-4 rounded-lg">
                  "{currentSentence.vietnamese}"
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Translation Input */}
          <Card className="bg-gray-800 border-gray-700 flex-1 flex flex-col">
            <CardContent className="p-4 flex-1 flex flex-col">
              <div className="text-sm text-gray-400 mb-2">
                Dịch sang {languageNames[language as keyof typeof languageNames]}:
              </div>
              <Textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder={`Nhập câu dịch của bạn...`}
                className="flex-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-500 resize-none"
                disabled={showResult && isCorrect}
              />
              <div className="flex justify-between items-center mt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowHint(!showHint)}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  size="sm"
                >
                  <Lightbulb className="h-4 w-4 mr-1" />
                  Hint
                </Button>
                <div className="flex space-x-2">
                  {showResult && !isCorrect && (
                    <Button
                      variant="outline"
                      onClick={tryAgain}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                      size="sm"
                    >
                      Try Again
                    </Button>
                  )}
                  <Button
                    onClick={showResult && isCorrect ? nextSentence : checkAnswer}
                    disabled={!userAnswer.trim() && !showResult}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
                  >
                    {showResult && isCorrect ? (
                      currentIndex < sentences.length - 1 ? (
                        "Next →"
                      ) : (
                        "Complete"
                      )
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-1" />
                        Submit
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Feedback & Hints */}
        <div className="col-span-1 flex flex-col space-y-4">
          {/* Feedback */}
          {showResult && (
            <Card className="bg-gray-800 border-gray-700 flex-shrink-0">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2 text-sm">Feedback</h3>
                {isCorrect ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-green-400">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="font-medium text-sm">Perfect!</span>
                    </div>
                    <div className="text-xs text-gray-300">Bản dịch chính xác! +15 points 🎉</div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-red-400">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span className="font-medium text-sm">Try again!</span>
                    </div>
                    <div className="text-xs text-gray-300">
                      <strong className="text-red-400">Đáp án:</strong> {currentSentence.correct}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Hint */}
          {showHint && (
            <Card className="bg-yellow-500/10 border-yellow-500/30 flex-1">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2 text-yellow-400 text-sm">Hints</h3>
                <ul className="space-y-1 text-xs text-yellow-200">
                  {currentSentence.hints.map((hint, index) => (
                    <li key={index} className="flex items-start space-x-1">
                      <span className="text-yellow-400">•</span>
                      <span>{hint}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
