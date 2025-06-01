"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Volume2, BookOpen, CheckCircle, Target, Clock, Award, Zap } from "lucide-react"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
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
  const [timeSpent, setTimeSpent] = useState(0)
  const [points, setPoints] = useState(150)
  const [streak, setStreak] = useState(3)

  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const vocabulary = vocabularyData[language as keyof typeof vocabularyData] || vocabularyData.english
  const currentWord = vocabulary[currentIndex]
  const progress = (learnedWords.size / vocabulary.length) * 100
  const accuracy = learnedWords.size > 0 ? Math.round((learnedWords.size / (currentIndex + 1)) * 100) : 100

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
    setPoints(points + 10)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
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
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-slate-100">Vocabulary Learning</h1>
                  <p className="text-xs text-slate-400">
                    Study • {languageNames[language as keyof typeof languageNames]}
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
              Word {currentIndex + 1} of {vocabulary.length}
            </span>
            <span className="text-xs text-slate-400">{learnedWords.size} learned</span>
          </div>
          <Progress value={progress} className="h-1.5 bg-slate-700/50">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-700 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </Progress>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex min-h-0">
        {/* Left Panel - Word Progress */}
        <div className="w-1/3 border-r border-slate-700/50 flex flex-col">
          <div className="bg-slate-800/30 px-6 py-3 border-b border-slate-700/30 flex items-center justify-between">
            <h3 className="text-sm font-medium text-slate-300 flex items-center">
              <span className="text-lg mr-2">{languageFlags[language as keyof typeof languageFlags]}</span>
              Word Progress
            </h3>
          </div>

          <div className="flex-1 p-6 overflow-y-auto">
            {/* Progress Grid */}
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/30 mb-6">
              <h5 className="text-sm font-medium text-slate-300 mb-3">
                Progress ({learnedWords.size}/{vocabulary.length})
              </h5>
              <div className="grid grid-cols-5 gap-2">
                {vocabulary.map((_, index) => (
                  <div
                    key={index}
                    className={`h-8 rounded flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                      learnedWords.has(index)
                        ? "bg-emerald-500 text-white"
                        : index === currentIndex
                          ? "bg-blue-500 text-white"
                          : "bg-slate-700 text-slate-400"
                    }`}
                  >
                    {learnedWords.has(index) ? "✓" : index + 1}
                  </div>
                ))}
              </div>

              {/* Accuracy */}
              <div className="mt-4 text-center">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div className="text-lg font-bold text-emerald-400">{accuracy}%</div>
                <div className="text-xs text-slate-400">Learning Rate</div>
              </div>
            </div>

            {/* Word List */}
            <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/30">
              <h5 className="text-sm font-medium text-slate-300 mb-3">Word List</h5>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {vocabulary.map((word, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-2 rounded text-xs ${
                      index === currentIndex
                        ? "bg-blue-500/20 border border-blue-500/30"
                        : learnedWords.has(index)
                          ? "bg-emerald-500/20 border border-emerald-500/30"
                          : "bg-slate-700/30"
                    }`}
                  >
                    <span className="text-slate-200">{word.word}</span>
                    {learnedWords.has(index) && <CheckCircle className="h-3 w-3 text-emerald-400" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Vocabulary Card */}
        <div className="w-2/3 flex flex-col">
          <div className="bg-slate-800/30 px-6 py-3 border-b border-slate-700/30">
            <h3 className="text-sm font-medium text-slate-300">Vocabulary Card</h3>
          </div>

          <div className="flex-1 p-6 flex flex-col justify-center">
            {/* Vocabulary Card */}
            <Card className="bg-slate-800/50 border-slate-700/50 max-w-2xl mx-auto w-full">
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium text-slate-400 bg-slate-700/50 px-2 py-1 rounded">
                    WORD {currentIndex + 1}
                  </span>
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-100">
                    <Volume2 className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle className="text-4xl font-bold text-blue-400 mb-4">{currentWord.word}</CardTitle>
                <CardDescription className="text-lg text-slate-300">{currentWord.pronunciation}</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <Button
                  variant="outline"
                  size="lg"
                  className="mb-4 border-slate-600 text-slate-300 hover:bg-slate-700/50"
                  onClick={() => setShowTranslation(!showTranslation)}
                >
                  {showTranslation ? "Hide Translation" : "Show Translation"}
                </Button>

                {showTranslation && (
                  <div className="space-y-4">
                    <div className="text-2xl font-semibold text-emerald-400">{currentWord.translation}</div>
                    <div className="text-slate-400 italic bg-slate-800/30 p-3 rounded-lg">
                      Example: {currentWord.example}
                    </div>
                  </div>
                )}

                <div className="flex justify-center space-x-4 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {}}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700/50"
                  >
                    <Volume2 className="h-4 w-4 mr-2" />
                    Pronunciation
                  </Button>
                  {!learnedWords.has(currentIndex) && (
                    <Button onClick={markAsLearned} className="bg-emerald-600 hover:bg-emerald-700">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark as Learned
                    </Button>
                  )}
                  {learnedWords.has(currentIndex) && (
                    <Button variant="outline" className="text-emerald-400 border-emerald-500/30 bg-emerald-500/10">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Learned
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between mt-8 max-w-2xl mx-auto w-full">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="border-slate-600 text-slate-300 hover:bg-slate-700/50"
              >
                ← Previous Word
              </Button>
              <Button
                onClick={handleNext}
                disabled={currentIndex === vocabulary.length - 1}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Next Word →
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Panel - Stats */}
      <div className="bg-slate-800/50 border-t border-slate-700/50 px-6 py-3">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4 text-slate-400" />
                <span className="text-xs text-slate-300">
                  {learnedWords.size}/{vocabulary.length} words learned
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4 text-emerald-400" />
                <span className="text-xs text-slate-300">{accuracy}% learning rate</span>
              </div>
            </div>
            <div className="text-xs text-slate-400">Click the pronunciation button to hear the word</div>
          </div>
        </div>
      </div>
    </div>
  )
}
