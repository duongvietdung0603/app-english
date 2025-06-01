"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Lightbulb,
  Send,
  BookOpen,
  Target,
  Clock,
  Award,
  Volume2,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Zap,
  Eye,
  EyeOff,
} from "lucide-react"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { useParams } from "next/navigation"

const paragraphData = {
  english: {
    title: "My Daily Routine",
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
      {
        vietnamese: "Tôi làm việc từ 8 giờ sáng đến 5 giờ chiều.",
        correct: "I work from 8 AM to 5 PM.",
        hints: ["'làm việc' là 'work'", "'từ...đến' là 'from...to'"],
      },
      {
        vietnamese: "Cuối cùng, tôi về nhà và nghỉ ngơi.",
        correct: "Finally, I go home and rest.",
        hints: ["'cuối cùng' là 'finally'", "'nghỉ ngơi' là 'rest'"],
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
      {
        vietnamese: "Tôi làm việc từ 8 giờ sáng đến 5 giờ chiều.",
        correct: "私は朝8時から夕方5時まで働きます。",
        hints: ["働きます (hatarakimasu) = làm việc", "から...まで = từ...đến"],
      },
      {
        vietnamese: "Cuối cùng, tôi về nhà và nghỉ ngơi.",
        correct: "最後に、家に帰って休みます。",
        hints: ["最後に (saigo ni) = cuối cùng", "休みます (yasumimasu) = nghỉ ngơi"],
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
  const [translatedSentences, setTranslatedSentences] = useState<{ [key: number]: string }>({})
  const [credits, setCredits] = useState(12)
  const [points, setPoints] = useState(240)
  const [streak, setStreak] = useState(7)
  const [timeSpent, setTimeSpent] = useState(0)
  const [showPreview, setShowPreview] = useState(true)
  const [selectedWord, setSelectedWord] = useState<string | null>(null)
  const [wordDefinition, setWordDefinition] = useState<string | null>(null)

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const paragraphInfo = paragraphData[language as keyof typeof paragraphData] || paragraphData.english
  const currentSentence = paragraphInfo.sentences[currentSentenceIndex]
  const progress = ((currentSentenceIndex + 1) / paragraphInfo.sentences.length) * 100
  const accuracy =
    completedSentences.size > 0 ? Math.round((completedSentences.size / (currentSentenceIndex + 1)) * 100) : 100

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
      setCompletedSentences((prev) => new Set([...prev, currentSentenceIndex]))
      setTranslatedSentences((prev) => ({ ...prev, [currentSentenceIndex]: currentSentence.correct }))
      setPoints(points + 25)
      setCredits(credits + 2)
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

  const renderParagraphPreview = () => {
    return paragraphInfo.sentences.map((sentence, index) => {
      let displayText = sentence.vietnamese
      let className = "transition-all duration-500 ease-in-out px-2 py-1 rounded"

      if (completedSentences.has(index)) {
        displayText = translatedSentences[index] || sentence.correct
        className += " bg-emerald-500/20 text-emerald-300 border-l-4 border-emerald-500"
      } else if (index === currentSentenceIndex) {
        className += " bg-blue-500/20 text-blue-300 border-l-4 border-blue-500 animate-pulse"
      } else if (index > currentSentenceIndex) {
        className += " text-slate-500"
      } else {
        className += " text-slate-400 bg-slate-800/30"
      }

      return (
        <div key={index} className={className}>
          <span className="text-xs text-slate-400 mr-2">{index + 1}.</span>
          {displayText}
        </div>
      )
    })
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleWordClick = (word: string) => {
    setSelectedWord(word)
    // Mock dictionary lookup
    const definitions: { [key: string]: string } = {
      tôi: "I, me",
      thức: "wake",
      dậy: "up",
      lúc: "at (time)",
      giờ: "hour, o'clock",
      sáng: "morning",
    }
    setWordDefinition(definitions[word.toLowerCase()] || "Không tìm thấy định nghĩa")
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
                  <BookOpen className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-slate-100">{paragraphInfo.title}</h1>
                  <p className="text-xs text-slate-400">
                    Paragraph Translation • {languageNames[language as keyof typeof languageNames]}
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
              Sentence {currentSentenceIndex + 1} of {paragraphInfo.sentences.length}
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
        {/* Left Panel - Document Preview */}
        <div className="w-1/2 border-r border-slate-700/50 flex flex-col">
          <div className="bg-slate-800/30 px-6 py-3 border-b border-slate-700/30 flex items-center justify-between">
            <h3 className="text-sm font-medium text-slate-300 flex items-center">
              <span className="text-lg mr-2">{languageFlags[language as keyof typeof languageFlags]}</span>
              Document Preview
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
              className="text-slate-400 hover:text-slate-100"
            >
              {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>

          {showPreview && (
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/30">
                <h4 className="text-lg font-semibold text-slate-200 mb-4 border-b border-slate-700/50 pb-2">
                  {paragraphInfo.title}
                </h4>
                <div className="space-y-3 leading-relaxed">{renderParagraphPreview()}</div>
              </div>

              {/* Mini Progress Map */}
              <div className="mt-6 bg-slate-800/30 rounded-lg p-4 border border-slate-700/30">
                <h5 className="text-sm font-medium text-slate-300 mb-3">Progress Map</h5>
                <div className="grid grid-cols-6 gap-2">
                  {paragraphInfo.sentences.map((_, index) => (
                    <div
                      key={index}
                      className={`h-8 rounded flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                        completedSentences.has(index)
                          ? "bg-emerald-500 text-white"
                          : index === currentSentenceIndex
                            ? "bg-blue-500 text-white"
                            : "bg-slate-700 text-slate-400"
                      }`}
                    >
                      {index + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - Translation Workspace */}
        <div className="w-1/2 flex flex-col">
          <div className="bg-slate-800/30 px-6 py-3 border-b border-slate-700/30">
            <h3 className="text-sm font-medium text-slate-300">Translation Workspace</h3>
          </div>

          <div className="flex-1 p-6 flex flex-col">
            {/* Current Sentence */}
            <Card className="bg-slate-800/50 border-slate-700/50 mb-6">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium text-slate-400 bg-slate-700/50 px-2 py-1 rounded">
                    SENTENCE {currentSentenceIndex + 1}
                  </span>
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-100">
                    <Volume2 className="h-4 w-4" />
                  </Button>
                </div>
                <div
                  className="text-lg text-slate-200 leading-relaxed cursor-pointer"
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

            {/* Translation Input */}
            <div className="flex-1 flex flex-col">
              <label className="text-sm font-medium text-slate-300 mb-3">Your Translation:</label>
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder={`Type your ${languageNames[language as keyof typeof languageNames]} translation here...`}
                  className="w-full h-full min-h-[120px] bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 resize-none"
                  disabled={showResult && isCorrect}
                />

                {/* Word count */}
                <div className="absolute bottom-3 right-3 text-xs text-slate-500">
                  {userAnswer.split(" ").filter((word) => word.length > 0).length} words
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowHint(!showHint)}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700/50"
                  >
                    <Lightbulb className="h-4 w-4 mr-2" />
                    {showHint ? "Hide Hint" : "Show Hint"}
                  </Button>

                  {showResult && !isCorrect && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={tryAgain}
                      className="border-slate-600 text-slate-300 hover:bg-slate-700/50"
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Try Again
                    </Button>
                  )}
                </div>

                <Button
                  onClick={showResult && isCorrect ? nextSentence : checkAnswer}
                  disabled={!userAnswer.trim() && !showResult}
                  className={`px-6 ${
                    showResult && isCorrect ? "bg-emerald-600 hover:bg-emerald-700" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {showResult && isCorrect ? (
                    currentSentenceIndex < paragraphInfo.sentences.length - 1 ? (
                      <>
                        Next Sentence
                        <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                      </>
                    ) : (
                      <>
                        Complete
                        <CheckCircle2 className="h-4 w-4 ml-2" />
                      </>
                    )
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Submit Translation
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Panel - Feedback & Tools */}
      <div className="bg-slate-800/50 border-t border-slate-700/50 px-6 py-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-3 gap-6">
            {/* Feedback */}
            {showResult && (
              <div
                className={`p-4 rounded-lg border ${
                  isCorrect ? "bg-emerald-500/10 border-emerald-500/30" : "bg-red-500/10 border-red-500/30"
                }`}
              >
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
                {!isCorrect && (
                  <div className="text-sm text-slate-300">
                    <strong>Correct answer:</strong> {currentSentence.correct}
                  </div>
                )}
              </div>
            )}

            {/* Hints */}
            {showHint && (
              <div className="p-4 rounded-lg border bg-yellow-500/10 border-yellow-500/30">
                <div className="flex items-center space-x-2 mb-2">
                  <Lightbulb className="h-5 w-5 text-yellow-400" />
                  <span className="font-medium text-yellow-300">Translation Hints</span>
                </div>
                <ul className="text-sm text-yellow-200 space-y-1">
                  {currentSentence.hints.map((hint, index) => (
                    <li key={index}>• {hint}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Dictionary */}
            {selectedWord && wordDefinition && (
              <div className="p-4 rounded-lg border bg-blue-500/10 border-blue-500/30">
                <div className="flex items-center space-x-2 mb-2">
                  <BookOpen className="h-5 w-5 text-blue-400" />
                  <span className="font-medium text-blue-300">Dictionary</span>
                </div>
                <div className="text-sm">
                  <span className="text-blue-200 font-medium">{selectedWord}</span>
                  <span className="text-slate-300 ml-2">{wordDefinition}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
