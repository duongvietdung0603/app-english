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
  MessageSquare,
} from "lucide-react"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { useParams } from "next/navigation"

interface ParagraphSentence {
  id: number
  vietnamese: string
  correct: string
  hints: string[]
}

interface ParagraphData {
  title: string
  sentences: ParagraphSentence[]
}

export default function ParagraphTranslationPage() {
  const params = useParams()
  const language = params.language as string
  const [paragraphInfo, setParagraphInfo] = useState<ParagraphData | null>(null)
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
  const [selectedWord, setSelectedWord] = useState<string | null>(null)
  const [wordDefinition, setWordDefinition] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const currentSentence = paragraphInfo?.sentences[currentSentenceIndex]
  const progress = paragraphInfo ? ((currentSentenceIndex + 1) / paragraphInfo.sentences.length) * 100 : 0
  const accuracy =
    completedSentences.size > 0 ? Math.round((completedSentences.size / (currentSentenceIndex + 1)) * 100) : 100

  // Fetch paragraph data
  useEffect(() => {
    const fetchParagraph = async () => {
      try {
        const response = await fetch(`/api/paragraphs/${language}`)
        const data = await response.json()

        if (data.success) {
          setParagraphInfo(data.data)
        }
      } catch (error) {
        console.error("Error fetching paragraph:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchParagraph()
  }, [language])

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
    if (!currentSentence) return

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
    if (paragraphInfo && currentSentenceIndex < paragraphInfo.sentences.length - 1) {
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

  const renderParagraph = () => {
    if (!paragraphInfo) return null

    return paragraphInfo.sentences.map((sentence, index) => {
      let displayText = sentence.vietnamese
      let textColor = "text-gray-400"
      let bgColor = ""

      // If sentence is completed, show translated version in green
      if (completedSentences.has(index)) {
        displayText = translatedSentences[index] || sentence.correct
        textColor = "text-green-400"
        bgColor = "bg-green-500/10"
      }
      // If it's the current sentence, highlight in pink
      else if (index === currentSentenceIndex) {
        textColor = "text-pink-400"
        bgColor = "bg-pink-500/10"
      }
      // Future sentences remain gray
      else if (index > currentSentenceIndex) {
        textColor = "text-gray-500"
      }
      // Past incomplete sentences
      else {
        textColor = "text-gray-400"
      }

      return (
        <span
          key={index}
          className={`${textColor} ${bgColor} ${
            index === currentSentenceIndex ? "px-2 py-1 rounded" : ""
          } transition-all duration-500 ease-in-out`}
          onClick={() => {
            if (index < currentSentenceIndex || completedSentences.has(index)) {
              setSelectedWord(null)
              setWordDefinition(null)
            }
          }}
        >
          {displayText}
          {index < paragraphInfo.sentences.length - 1 ? " " : ""}
        </span>
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-slate-400">Loading paragraph...</div>
      </div>
    )
  }

  if (!paragraphInfo) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-slate-400">No paragraph found for this language.</div>
      </div>
    )
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
          </div>

          <div className="flex-1 p-6 overflow-y-auto">
            {/* Original Paragraph Display */}
            <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/30">
              <h4 className="text-lg font-semibold text-slate-200 mb-4 border-b border-slate-700/50 pb-2">
                {paragraphInfo.title}
              </h4>
              <div className="text-lg leading-relaxed space-y-4">
                <div className="text-2xl font-bold text-slate-300 mb-6">Hi Emma,</div>
                <div className="text-lg leading-8">{renderParagraph()}</div>
                <div className="text-slate-400 mt-8">
                  <div>Trân trọng,</div>
                  <div className="mt-2">Michael</div>
                </div>
              </div>
            </div>

            {/* Translation Input Area */}
            <div className="mt-6 bg-slate-800/30 rounded-lg p-4 border border-slate-700/30">
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
                      currentSentenceIndex < paragraphInfo.sentences.length - 1 ? (
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
            {currentSentence && (
              <Card className="bg-slate-800/50 border-slate-700/50 mb-4">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-slate-400 bg-slate-700/50 px-2 py-1 rounded">
                      SENTENCE {currentSentenceIndex + 1}
                    </span>
                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-100">
                      <Volume2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div
                    className="text-lg text-pink-400 bg-pink-500/10 p-3 rounded-lg cursor-pointer"
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
            )}

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
                        Excellent work! Your translation is accurate and natural. The sentence has been replaced in the
                        paragraph and turned green.
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-emerald-300 bg-emerald-500/20 p-2 rounded">
                        <Zap className="h-4 w-4" />
                        <span>+25 points earned!</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-sm text-red-200">
                        Your translation needs some adjustments. Try again with the correct answer below:
                      </div>
                      {currentSentence && (
                        <div className="bg-slate-800/50 p-2 rounded text-slate-200 font-medium border-l-2 border-red-500">
                          {currentSentence.correct}
                        </div>
                      )}
                      <div className="text-xs text-slate-400">
                        Compare your answer with the correct translation and try again.
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Hints Panel */}
            {showHint && currentSentence && (
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
                  {completedSentences.size}/{paragraphInfo.sentences.length} sentences
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
