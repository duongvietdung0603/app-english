"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
    { word: "Family", translation: "Gia đình", pronunciation: "/ˈfæməli/", example: "I love my family." },
    { word: "Friend", translation: "Bạn bè", pronunciation: "/frend/", example: "She is my best friend." },
    { word: "School", translation: "Trường học", pronunciation: "/skuːl/", example: "I go to school every day." },
    { word: "House", translation: "Ngôi nhà", pronunciation: "/haʊs/", example: "This is my house." },
    { word: "Water", translation: "Nước", pronunciation: "/ˈwɔːtər/", example: "I drink water every day." },
  ],
  japanese: [
    { word: "こんにちは", translation: "Xin chào", pronunciation: "Konnichiwa", example: "こんにちは、元気ですか？" },
    { word: "ありがとう", translation: "Cảm ơn", pronunciation: "Arigatou", example: "ありがとうございます。" },
    { word: "おはよう", translation: "Chào buổi sáng", pronunciation: "Ohayou", example: "おはようございます！" },
    { word: "きれい", translation: "Đẹp", pronunciation: "Kirei", example: "この花はきれいです。" },
    { word: "大切", translation: "Quan trọng", pronunciation: "Taisetsu", example: "これは大切なことです。" },
    { word: "家族", translation: "Gia đình", pronunciation: "Kazoku", example: "家族が大好きです。" },
    { word: "友達", translation: "Bạn bè", pronunciation: "Tomodachi", example: "彼は私の友達です。" },
    { word: "学校", translation: "Trường học", pronunciation: "Gakkou", example: "毎日学校に行きます。" },
    { word: "家", translation: "Ngôi nhà", pronunciation: "Ie", example: "これは私の家です。" },
    { word: "水", translation: "Nước", pronunciation: "Mizu", example: "毎日水を飲みます。" },
  ],
}

export default function VocabularyPage() {
  const params = useParams()
  const language = params.language as string
  const [learnedWords, setLearnedWords] = useState<Set<number>>(new Set())
  const [timeSpent, setTimeSpent] = useState(0)
  const [points, setPoints] = useState(150)
  const [streak, setStreak] = useState(3)

  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const vocabulary = vocabularyData[language as keyof typeof vocabularyData] || vocabularyData.english
  const progress = (learnedWords.size / vocabulary.length) * 100

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

  const markAsLearned = (index: number) => {
    if (!learnedWords.has(index)) {
      setLearnedWords((prev) => new Set([...prev, index]))
      setPoints(points + 10)
    }
  }

  const playPronunciation = (word: string) => {
    // Mock pronunciation - in real app, you'd use Web Speech API or audio files
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(word)
      utterance.lang = language === "english" ? "en-US" : "ja-JP"
      utterance.rate = 0.8
      speechSynthesis.speak(utterance)
    }
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
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Professional Header */}
      <header className="bg-slate-800/90 backdrop-blur-sm border-b border-slate-700/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-100 hover:bg-slate-700/50">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-slate-100">Vocabulary Learning</h1>
                  <p className="text-xs text-slate-400">
                    {languageFlags[language as keyof typeof languageFlags]}{" "}
                    {languageNames[language as keyof typeof languageNames]} Words
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
                <span className="text-sm text-emerald-300">{Math.round(progress)}%</span>
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
              Progress: {learnedWords.size} of {vocabulary.length} words learned
            </span>
            <span className="text-xs text-slate-400">{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-1.5 bg-slate-700/50">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-700 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </Progress>
        </div>
      </div>

      {/* Vocabulary List */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-100 mb-2">New Vocabulary</h2>
            <p className="text-slate-400">Click the speaker icon to hear pronunciation</p>
          </div>

          <div className="grid gap-4">
            {vocabulary.map((item, index) => (
              <Card
                key={index}
                className={`bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/70 transition-all ${
                  learnedWords.has(index) ? "ring-2 ring-emerald-500/30 bg-emerald-500/10" : ""
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-2">
                        <h3 className="text-xl font-semibold text-blue-400">{item.word}</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => playPronunciation(item.word)}
                          className="text-slate-400 hover:text-slate-100 hover:bg-slate-700/50"
                        >
                          <Volume2 className="h-4 w-4" />
                        </Button>
                        <span className="text-sm text-slate-400 font-mono">{item.pronunciation}</span>
                      </div>
                      <p className="text-lg text-emerald-400 mb-2">{item.translation}</p>
                      <p className="text-sm text-slate-400 italic">Example: {item.example}</p>
                    </div>
                    <div className="ml-4">
                      {learnedWords.has(index) ? (
                        <Button
                          variant="outline"
                          className="text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
                          disabled
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Learned
                        </Button>
                      ) : (
                        <Button onClick={() => markAsLearned(index)} className="bg-blue-600 hover:bg-blue-700">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Mark as Learned
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-8 text-center">
            <Card className="bg-slate-800/50 border-slate-700/50 max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="text-slate-100">Learning Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Words Learned:</span>
                    <span className="text-emerald-400 font-semibold">
                      {learnedWords.size}/{vocabulary.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Progress:</span>
                    <span className="text-blue-400 font-semibold">{Math.round(progress)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Points Earned:</span>
                    <span className="text-yellow-400 font-semibold">+{learnedWords.size * 10}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
