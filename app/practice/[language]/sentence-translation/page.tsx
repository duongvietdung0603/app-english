"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Lightbulb, Send, BookOpen, Flame, Zap, Target } from "lucide-react"
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
  const [translatedSentences, setTranslatedSentences] = useState<{ [key: number]: string }>({})
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
      setTranslatedSentences((prev) => ({ ...prev, [currentIndex]: currentSentence.correct }))
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

  const renderSentenceList = () => {
    return sentences.map((sentence, index) => {
      let displayText = sentence.vietnamese
      let textColor = "text-gray-500"
      let bgColor = ""
      let borderColor = ""

      // If sentence is completed, show translated version in green
      if (completedSentences.has(index)) {
        displayText = translatedSentences[index] || sentence.correct
        textColor = "text-green-400"
        borderColor = "border-green-500/30"
        bgColor = "bg-green-500/10"
      }
      // If it's the current sentence, highlight in pink
      else if (index === currentIndex) {
        textColor = "text-pink-400"
        bgColor = "bg-pink-500/20"
        borderColor = "border-pink-500/50"
      }
      // Future sentences remain gray
      else if (index > currentIndex) {
        textColor = "text-gray-500"
        borderColor = "border-gray-700"
      }
      // Past incomplete sentences
      else {
        textColor = "text-gray-400"
        borderColor = "border-gray-700"
      }

      return (
        <div
          key={index}
          className={`p-4 rounded-lg border ${borderColor} ${bgColor} transition-all duration-500 ease-in-out`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  completedSentences.has(index)
                    ? "bg-green-500 text-white"
                    : index === currentIndex
                      ? "bg-pink-500 text-white"
                      : "bg-gray-700 text-gray-400"
                }`}
              >
                {index + 1}
              </div>
              <span className={`${textColor} transition-all duration-500 ease-in-out`}>{displayText}</span>
            </div>
            {completedSentences.has(index) && <div className="text-green-400">✓</div>}
            {index === currentIndex && !completedSentences.has(index) && <div className="text-pink-400">→</div>}
          </div>
        </div>
      )
    })
  }

  const languageNames = {
    english: "Tiếng Anh",
    japanese: "Tiếng Nhật",
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Quit
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-yellow-400">
                Dịch câu sang {languageNames[language as keyof typeof languageNames]}
              </h1>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-xs">
                  $
                </div>
                <span>{credits} credits</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-black">⭐</div>
                <span>{points} points</span>
              </div>
              <div className="text-gray-400">
                Progress: {currentIndex + 1}/{sentences.length} sentences
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-gray-800 px-4 py-2">
        <div className="container mx-auto">
          <Progress value={progress} className="h-3 bg-gray-700">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </Progress>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Sentence List Display */}
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white mb-2">Danh sách câu cần dịch</h3>
                <p className="text-gray-400 text-sm">
                  Dịch từng câu theo thứ tự. Câu đã hoàn thành sẽ chuyển sang màu xanh.
                </p>
              </div>
              <div className="space-y-3">{renderSentenceList()}</div>
            </CardContent>
          </Card>

          {/* Current Sentence Info */}
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="text-sm text-gray-400 mb-2">
                Đang dịch câu {currentIndex + 1}/{sentences.length}:
              </div>
              <div className="text-pink-400 font-medium bg-pink-500/10 p-3 rounded-lg">
                "{currentSentence.vietnamese}"
              </div>
            </CardContent>
          </Card>

          {/* Translation Input */}
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="text-sm text-gray-400">
                  Dịch sang {languageNames[language as keyof typeof languageNames]}:
                </div>
                <Textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder={`Nhập câu dịch của bạn...`}
                  className="min-h-[120px] bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-500"
                  disabled={showResult && isCorrect}
                />
                <div className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    onClick={() => setShowHint(!showHint)}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Hint
                  </Button>
                  <div className="flex space-x-2">
                    {showResult && !isCorrect && (
                      <Button
                        variant="outline"
                        onClick={tryAgain}
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
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
                          <Send className="h-4 w-4 mr-2" />
                          Submit {credits > 0 && `(${credits})`}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Dictionary */}
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-5 w-5 text-blue-400" />
                <h3 className="font-semibold">Dictionary</h3>
              </div>
              <div className="text-sm text-gray-400">
                Click on any word in the Vietnamese text to see its translation.
              </div>
            </CardContent>
          </Card>

          {/* Accuracy */}
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <Target className="h-8 w-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-green-400">
                {Math.round((completedSentences.size / Math.max(currentIndex + 1, 1)) * 100)}%
              </div>
              <div className="text-sm text-gray-400">Accuracy</div>
            </CardContent>
          </Card>

          {/* Feedback */}
          {showResult && (
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Feedback</h3>
                {isCorrect ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-green-400">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="font-medium">Perfect translation!</span>
                    </div>
                    <div className="text-sm text-gray-300">
                      <strong className="text-green-400">Nhận xét:</strong> Bản dịch của bạn rất chính xác và tự nhiên.
                      Câu đã được đánh dấu hoàn thành trong danh sách. Tiếp tục với câu tiếp theo! 🎉
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-red-400">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span className="font-medium">Try again!</span>
                    </div>
                    <div className="text-sm text-gray-300">
                      <strong className="text-red-400">Đáp án đúng:</strong> {currentSentence.correct}
                    </div>
                    <div className="text-xs text-gray-400">Hãy thử lại để hoàn thành câu này.</div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Hint */}
          {showHint && (
            <Card className="bg-yellow-500/10 border-yellow-500/30">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 text-yellow-400">Hints</h3>
                <ul className="space-y-2 text-sm text-yellow-200">
                  {currentSentence.hints.map((hint, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-yellow-400">•</span>
                      <span>{hint}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Today's Achievements */}
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">Today's Achievements</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Flame className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-sm font-medium">{streak} Day Streak</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-sm font-medium">Quick Learner</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress Summary */}
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Progress Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Completed:</span>
                  <span className="text-green-400">{completedSentences.size} sentences</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Remaining:</span>
                  <span className="text-yellow-400">{sentences.length - completedSentences.size} sentences</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total:</span>
                  <span className="text-white">{sentences.length} sentences</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
