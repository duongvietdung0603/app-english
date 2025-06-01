"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Lightbulb,
  Send,
  Target,
  Clock,
  Award,
  RotateCcw,
  Zap,
  MessageSquare,
  Bot,
  User,
} from "lucide-react"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { useParams } from "next/navigation"

interface SentenceData {
  id: number
  vietnamese: string
  correct: string
  hints: string[]
}

interface ChatMessage {
  id: string
  type: "bot" | "user" | "system"
  content: string
  timestamp: Date
  isCorrect?: boolean
  showHints?: boolean
}

export default function SentenceTranslationPage() {
  const params = useParams()
  const language = params.language as string
  const [sentences, setSentences] = useState<SentenceData[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [showHint, setShowHint] = useState(false)
  const [completedSentences, setCompletedSentences] = useState<Set<number>>(new Set())
  const [credits, setCredits] = useState(8)
  const [points, setPoints] = useState(95)
  const [streak, setStreak] = useState(5)
  const [timeSpent, setTimeSpent] = useState(0)
  const [isWaitingForAnswer, setIsWaitingForAnswer] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const currentSentence = sentences[currentIndex]
  const progress = sentences.length > 0 ? ((currentIndex + 1) / sentences.length) * 100 : 0
  const accuracy = completedSentences.size > 0 ? Math.round((completedSentences.size / (currentIndex + 1)) * 100) : 100

  // Fetch sentences data
  useEffect(() => {
    const fetchSentences = async () => {
      try {
        const response = await fetch(`/api/sentences/${language}`)
        const data = await response.json()

        if (data.success) {
          setSentences(data.data)
        }
      } catch (error) {
        console.error("Error fetching sentences:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSentences()
  }, [language])

  // Initialize chat with first sentence
  useEffect(() => {
    if (sentences.length > 0 && messages.length === 0) {
      setMessages([
        {
          id: "1",
          type: "system",
          content: `Welcome to ${language === "english" ? "English" : "Japanese"} sentence translation practice! Let's start with your first sentence.`,
          timestamp: new Date(),
        },
        {
          id: "2",
          type: "bot",
          content: `Please translate this sentence to ${language === "english" ? "English" : "Japanese"}:\n\n"${currentSentence.vietnamese}"`,
          timestamp: new Date(),
        },
      ])
      setIsWaitingForAnswer(true)
    }
  }, [sentences, messages.length, language, currentSentence])

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

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"
    }
  }, [userAnswer])

  const addMessage = (message: Omit<ChatMessage, "id" | "timestamp">) => {
    const newMessage: ChatMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const checkAnswer = () => {
    if (!userAnswer.trim() || !currentSentence) return

    // Add user message
    addMessage({
      type: "user",
      content: userAnswer,
    })

    const correct = userAnswer.trim().toLowerCase() === currentSentence.correct.toLowerCase()

    setTimeout(() => {
      if (correct) {
        setCompletedSentences((prev) => new Set([...prev, currentIndex]))
        setPoints(points + 15)
        setCredits(credits + 1)

        addMessage({
          type: "bot",
          content: `🎉 Perfect! That's exactly right.\n\n✅ "${currentSentence.correct}"\n\n+15 points earned!`,
          isCorrect: true,
        })

        // Move to next sentence after a delay
        setTimeout(() => {
          if (currentIndex < sentences.length - 1) {
            const nextIndex = currentIndex + 1
            setCurrentIndex(nextIndex)
            addMessage({
              type: "bot",
              content: `Great job! Let's continue with the next sentence:\n\n"${sentences[nextIndex].vietnamese}"`,
            })
            setIsWaitingForAnswer(true)
          } else {
            addMessage({
              type: "system",
              content: `🎊 Congratulations! You've completed all sentences with ${accuracy}% accuracy!`,
            })
            setIsWaitingForAnswer(false)
          }
        }, 2000)
      } else {
        addMessage({
          type: "bot",
          content: `❌ Not quite right. The correct answer is:\n\n"${currentSentence.correct}"\n\nWould you like to try again or see some hints?`,
          isCorrect: false,
        })
      }
    }, 500)

    setUserAnswer("")
    setIsWaitingForAnswer(false)
  }

  const requestHint = () => {
    if (!currentSentence) return

    addMessage({
      type: "user",
      content: "Can you give me a hint?",
    })

    setTimeout(() => {
      const hints = currentSentence.hints.map((hint, index) => `${index + 1}. ${hint}`).join("\n")
      addMessage({
        type: "bot",
        content: `💡 Here are some hints:\n\n${hints}\n\nNow try translating: "${currentSentence.vietnamese}"`,
        showHints: true,
      })
      setIsWaitingForAnswer(true)
    }, 500)
  }

  const tryAgain = () => {
    if (!currentSentence) return

    addMessage({
      type: "user",
      content: "Let me try again",
    })

    setTimeout(() => {
      addMessage({
        type: "bot",
        content: `Of course! Here's the sentence again:\n\n"${currentSentence.vietnamese}"`,
      })
      setIsWaitingForAnswer(true)
    }, 500)
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (isWaitingForAnswer) {
        checkAnswer()
      }
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-slate-400">Loading sentences...</div>
      </div>
    )
  }

  if (sentences.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-slate-400">No sentences found for this language.</div>
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
                  <MessageSquare className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-slate-100">Sentence Translation Chat</h1>
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

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`flex items-start space-x-3 max-w-[80%] ${
                  message.type === "user" ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === "user"
                      ? "bg-blue-500"
                      : message.type === "system"
                        ? "bg-purple-500"
                        : "bg-emerald-500"
                  }`}
                >
                  {message.type === "user" ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-white" />
                  )}
                </div>

                {/* Message Content */}
                <div
                  className={`rounded-lg p-4 ${
                    message.type === "user"
                      ? "bg-blue-600 text-white"
                      : message.type === "system"
                        ? "bg-purple-600/20 border border-purple-500/30 text-purple-200"
                        : message.isCorrect === true
                          ? "bg-emerald-600/20 border border-emerald-500/30 text-emerald-200"
                          : message.isCorrect === false
                            ? "bg-red-600/20 border border-red-500/30 text-red-200"
                            : "bg-slate-700/50 border border-slate-600/50 text-slate-200"
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                  <div className="text-xs opacity-70 mt-2">{message.timestamp.toLocaleTimeString()}</div>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-slate-800/50 border-t border-slate-700/50 p-6">
        <div className="max-w-4xl mx-auto">
          {isWaitingForAnswer ? (
            <div className="flex space-x-3">
              <div className="flex-1">
                <textarea
                  ref={textareaRef}
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Type your ${languageNames[language as keyof typeof languageNames]} translation here...`}
                  className="w-full min-h-[60px] max-h-[120px] bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 resize-none"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Button
                  onClick={checkAnswer}
                  disabled={!userAnswer.trim()}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={requestHint}
                  className="border-slate-600 text-slate-300 hover:bg-slate-700/50"
                >
                  <Lightbulb className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex justify-center space-x-3">
              <Button
                variant="outline"
                onClick={requestHint}
                className="border-slate-600 text-slate-300 hover:bg-slate-700/50"
              >
                <Lightbulb className="h-4 w-4 mr-2" />
                Get Hint
              </Button>
              <Button onClick={tryAgain} className="bg-blue-600 hover:bg-blue-700">
                <RotateCcw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </div>
          )}

          <div className="text-xs text-slate-400 text-center mt-3">Press Enter to send • Shift+Enter for new line</div>
        </div>
      </div>
    </div>
  )
}
