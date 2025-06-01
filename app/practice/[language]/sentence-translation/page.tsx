"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Lightbulb,
  Send,
  Target,
  Clock,
  Award,
  Volume2,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Zap,
  MessageSquare,
  BookOpen,
} from "lucide-react"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
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
  const [timeSpent, setTimeSpent] = useState(0)
  const [selectedWord, setSelectedWord] = useState<string | null>(null)
  const [wordDefinition, setWordDefinition] = useState<string | null>(null)

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const sentences = sentenceData[language as keyof typeof sentenceData] || sentenceData.english
  const currentSentence = sentences[currentIndex]
  const progress = ((currentIndex + 1) / sentences.length) * 100
  const accuracy = completedSentences.size > 0 ? Math.round((completedSentences.size / (currentIndex + 1)) * 100) : 100

  // Timer effect
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeSpent((prev) => prev + 1)
    }, 1000)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"
    }
  }, [userAnswer])

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
      <div className="grid grid-cols-6 gap-2">
        {sentences.map((_, index) => {
          let bgColor = "bg-slate-700"
          let textColor = "text-slate-400"

          if (completedSentences.has(index)) {
            bgColor = "bg-emerald-500"
            textColor = "text-white"
          } else if (index === currentIndex) {
            bgColor = "bg-blue-500"
            textColor = "text-white"
          }

          return (
            <div
              key={index}
              className={`h-8 rounded flex items-center justify-center text-xs font-medium transition-all duration-300 ${bgColor} ${textColor}`}
            >
              {completedSentences.has(index) ? "✓" : index + 1}
            </div>
          )
        })}
      </div>
    )
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleWordClick = (word: string) => {
    setSelectedWord(word)
    const definitions: { [key: string]: string } = {
      tôi: "I, me",
      đang: "currently",
      học: "learn, study",
      tiếng: "language",
      anh: "English",
    }
    setWordDefinition(definitions[word.toLowerCase()] || "No definition found")
  }

  const languageNames = {
    english: "English",
    japanese: "Japanese",
  }

  const languageFlags = {
    english: "🇺🇸",
    japanese: "🇯🇵",
  }

  return (
    <div className="h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Professional Header */}
      <header className="bg-slate-800/90 backdrop-blur-sm border-b border-slate-700/50 flex-shrink-0">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-100 hover:bg-slate-700/50">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Exit
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-slate-100">Sentence Translation</h1>
                  <p className="text-xs text-slate-400">
                    Practice • {languageNames[language as keyof typeof languageNames]}
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-slate-400" />
                <span className="text-sm text-slate-300">{formatTime(timeSpent)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4 text-emerald-400" />
                <span className="text-sm text-emerald-300">{accuracy}%</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-yellow-400" />
                <span className="text-sm text-yellow-300">{points}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-orange-400" />
                <span className="text-sm text-orange-300">{streak}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="bg-slate-800/50 px-6 py-3 border-b border-slate-700/30">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-400">
              Sentence {currentIndex + 1} of {sentences.length}
            </span>
            <span className="text-xs text-slate-400">{completedSentences.size} completed</span>
          </div>
          <Progress value={progress} className="h-1.5 bg-slate-700/50">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-700 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </Progress>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex min-h-0">
        {/* Left Panel - Progress & Translation Input */}
        <div className="w-1/2 border-r border-slate-700/50 flex flex-col">
          <div className="bg-slate-800/30 px-6 py-3 border-b border-slate-700/30 flex items-center justify-between">
            <h3 className="text-sm font-medium text-slate-300 flex items-center">
              <span className="text-lg mr-2">{languageFlags[language as keyof typeof languageFlags]}</span>
              Progress & Translation
            </h3>
          </div>

          <div className="flex-1 p-6 overflow-y-auto">
            {/* Progress Map */}
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/30 mb-6">
              <h5 className="text-sm font-medium text-slate-300 mb-3">
                Progress ({completedSentences.size}/{sentences.length})
              </h5>
              {renderCompactSentenceList()}

              {/* Accuracy */}
              <div className="mt-4 text-center">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div className="text-lg font-bold text-emerald-400">{accuracy}%</div>
                <div className="text-xs text-slate-400">Accuracy</div>
              </div>
            </div>

            {/* Translation Input Area */}
            <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/30">
              <h5 className="text-sm font-medium text-slate-300 mb-3">Your Translation</h5>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-slate-400">
                    Translate to {languageNames[language as keyof typeof languageNames]}:
                  </label>
                  {showHint && (
                    <div className="flex items-center space-x-1 text-xs text-yellow-400">
                      <Lightbulb className="h-3 w-3" />
                      <span>Hint active</span>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <textarea
                    ref={textareaRef}
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder={`Type your ${languageNames[language as keyof typeof languageNames]} translation here...`}
                    className="w-full min-h-[100px] max-h-[200px] bg-slate-800/50 border border-slate-700/50 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 resize-none text-sm"
                    disabled={showResult && isCorrect}
                  />

                  {/* Word count */}
                  <div className="absolute bottom-2 right-2 text-xs text-slate-500">
                    {userAnswer.split(" ").filter((word) => word.length > 0).length} words
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowHint(!showHint)}
                      className="border-slate-600 text-slate-300 hover:bg-slate-700/50 text-xs"
                    >
                      <Lightbulb className="h-3 w-3 mr-1" />
                      {showHint ? "Hide Hint" : "Show Hint"}
                    </Button>

                    {showResult && !isCorrect && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={tryAgain}
                        className="border-slate-600 text-slate-300 hover:bg-slate-700/50 text-xs"
                      >
                        <RotateCcw className="h-3 w-3 mr-1" />
                        Try Again
                      </Button>
                    )}
                  </div>

                  <Button
                    onClick={showResult && isCorrect ? nextSentence : checkAnswer}
                    disabled={!userAnswer.trim() && !showResult}
                    size="sm"
                    className={`text-xs ${
                      showResult && isCorrect ? "bg-emerald-600 hover:bg-emerald-700" : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {showResult && isCorrect ? (
                      currentIndex < sentences.length - 1 ? (
                        <>
                          Next
                          <ArrowLeft className="h-3 w-3 ml-1 rotate-180" />
                        </>
                      ) : (
                        <>
                          Complete
                          <CheckCircle2 className="h-3 w-3 ml-1" />
                        </>
                      )
                    ) : (
                      <>
                        <Send className="h-3 w-3 mr-1" />
                        Submit
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Current Sentence & Feedback */}
        <div className="w-1/2 flex flex-col">
          <div className="bg-slate-800/30 px-6 py-3 border-b border-slate-700/30">
            <h3 className="text-sm font-medium text-slate-300">Current Sentence</h3>
          </div>

          <div className="flex-1 p-6 overflow-y-auto">
            {/* Current Sentence */}
            <Card className="bg-slate-800/50 border-slate-700/50 mb-4">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-400 bg-slate-700/50 px-2 py-1 rounded">
                    SENTENCE {currentIndex + 1}
                  </span>
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-100">
                    <Volume2 className="h-4 w-4" />
                  </Button>
                </div>
                <div
                  className="text-lg text-blue-400 bg-blue-500/10 p-3 rounded-lg cursor-pointer"
                  onClick={(e) => {
                    const target = e.target as HTMLElement
                    if (target.textContent) {
                      const words = target.textContent.split(" ")
                      const clickedWord = words.find((word) => target.textContent!.includes(word))
                      if (clickedWord) handleWordClick(clickedWord)
                    }
                  }}
                >
                  "{currentSentence.vietnamese}"
                </div>
              </CardContent>
            </Card>

            {/* Feedback Section */}
            {showResult && (
              <Card
                className={`mb-4 ${
                  isCorrect ? "bg-emerald-500/10 border-emerald-500/30" : "bg-red-500/10 border-red-500/30"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    {isCorrect ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-400" />
                    )}
                    <span className={`font-medium ${isCorrect ? "text-emerald-300" : "text-red-300"}`}>
                      {isCorrect ? "Perfect Translation!" : "Needs Improvement"}
                    </span>
                  </div>

                  {isCorrect ? (
                    <div className="space-y-2">
                      <div className="text-sm text-emerald-200">
                        Excellent work! Your translation is accurate and natural.
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-emerald-300 bg-emerald-500/20 p-2 rounded">
                        <Zap className="h-4 w-4" />
                        <span>+15 points earned!</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-sm text-red-200">
                        Your translation needs some adjustments. Try again with the correct answer below:
                      </div>
                      <div className="bg-slate-800/50 p-2 rounded text-slate-200 font-medium border-l-2 border-red-500">
                        {currentSentence.correct}
                      </div>
                      <div className="text-xs text-slate-400">
                        Compare your answer with the correct translation and try again.
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Hints Panel */}
            {showHint && (
              <Card className="mb-4 bg-yellow-500/10 border-yellow-500/30">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Lightbulb className="h-4 w-4 text-yellow-400" />
                    <span className="font-medium text-yellow-300 text-sm">Translation Hints</span>
                  </div>
                  <ul className="text-xs text-yellow-200 space-y-1">
                    {currentSentence.hints.map((hint, index) => (
                      <li key={index} className="flex items-start space-x-1">
                        <span>•</span>
                        <span>{hint}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Dictionary Lookup */}
            {selectedWord && wordDefinition && (
              <Card className="mb-4 bg-blue-500/10 border-blue-500/30">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <BookOpen className="h-4 w-4 text-blue-400" />
                    <span className="font-medium text-blue-300 text-sm">Dictionary</span>
                  </div>
                  <div className="text-xs">
                    <span className="text-blue-200 font-medium">{selectedWord}</span>
                    <span className="text-slate-300 ml-2">{wordDefinition}</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Panel - Stats & Tools */}
      <div className="bg-slate-800/50 border-t border-slate-700/50 px-6 py-3">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-slate-400" />
                <span className="text-xs text-slate-300">
                  {completedSentences.size}/{sentences.length} sentences
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4 text-emerald-400" />
                <span className="text-xs text-slate-300">{accuracy}% accuracy</span>
              </div>
            </div>
            <div className="text-xs text-slate-400">Click on words in the Vietnamese text to see their translation</div>
          </div>
        </div>
      </div>
    </div>
  )
}
