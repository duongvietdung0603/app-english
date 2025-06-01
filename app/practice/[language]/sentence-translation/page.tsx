"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Lightbulb, Send, Sparkles, Award, RotateCcw, Volume2 } from "lucide-react"
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
  const [showAnimation, setShowAnimation] = useState(false)
  const [showCorrectAnimation, setShowCorrectAnimation] = useState(false)
  const [showIncorrectAnimation, setShowIncorrectAnimation] = useState(false)
  const [chatMessages, setChatMessages] = useState<Array<{ type: string; content: string; isCorrect?: boolean }>>([])
  const chatEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const sentences = sentenceData[language as keyof typeof sentenceData] || sentenceData.english
  const currentSentence = sentences[currentIndex]
  const progress = ((currentIndex + 1) / sentences.length) * 100

  useEffect(() => {
    // Add initial message
    if (chatMessages.length === 0) {
      setChatMessages([
        {
          type: "system",
          content: `Chào mừng bạn đến với bài tập dịch câu! Hãy dịch các câu sau sang ${
            language === "english" ? "Tiếng Anh" : "Tiếng Nhật"
          }.`,
        },
        {
          type: "assistant",
          content: currentSentence.vietnamese,
        },
      ])
    }
  }, [])

  useEffect(() => {
    // Scroll to bottom of chat
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatMessages])

  const checkAnswer = () => {
    const correct = userAnswer.trim().toLowerCase() === currentSentence.correct.toLowerCase()
    setIsCorrect(correct)
    setShowResult(true)

    // Add user message
    setChatMessages([
      ...chatMessages,
      {
        type: "user",
        content: userAnswer,
        isCorrect: correct,
      },
    ])

    if (correct) {
      setCompletedSentences((prev) => new Set([...prev, currentIndex]))
      setPoints(points + 15)
      setCredits(credits + 1)
      setShowCorrectAnimation(true)
      setTimeout(() => setShowCorrectAnimation(false), 1500)

      // Add feedback message
      setChatMessages((prev) => [
        ...prev,
        {
          type: "feedback",
          content: "Tuyệt vời! Bản dịch của bạn hoàn toàn chính xác.",
          isCorrect: true,
        },
      ])
    } else {
      setShowIncorrectAnimation(true)
      setTimeout(() => setShowIncorrectAnimation(false), 1500)

      // Add feedback message
      setChatMessages((prev) => [
        ...prev,
        {
          type: "feedback",
          content: `Chưa chính xác. Đáp án đúng là: "${currentSentence.correct}"`,
          isCorrect: false,
        },
      ])
    }
  }

  const nextSentence = () => {
    if (currentIndex < sentences.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setUserAnswer("")
      setShowResult(false)
      setShowHint(false)
      setShowAnimation(true)
      setTimeout(() => setShowAnimation(false), 500)

      // Add next sentence message
      setChatMessages([
        ...chatMessages,
        {
          type: "system",
          content: "Tiếp tục với câu tiếp theo!",
        },
        {
          type: "assistant",
          content: sentences[currentIndex + 1].vietnamese,
        },
      ])

      // Focus input
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }

  const tryAgain = () => {
    setUserAnswer("")
    setShowResult(false)
    setShowHint(false)

    // Add system message
    setChatMessages([
      ...chatMessages,
      {
        type: "system",
        content: "Hãy thử lại!",
      },
    ])

    // Focus input
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
  }

  const toggleHint = () => {
    setShowHint(!showHint)
    if (!showHint) {
      // Add hint message
      setChatMessages([
        ...chatMessages,
        {
          type: "hint",
          content: currentSentence.hints.join(" | "),
        },
      ])
    }
  }

  const languageNames = {
    english: "Tiếng Anh",
    japanese: "Tiếng Nhật",
  }

  const languageFlags = {
    english: "🇺🇸",
    japanese: "🇯🇵",
  }

  return (
    <div className="h-screen bg-gradient-to-b from-indigo-900 via-indigo-800 to-indigo-900 text-white flex flex-col">
      {/* Correct Animation */}
      {showCorrectAnimation && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="animate-bounce flex flex-col items-center">
            <Sparkles className="h-24 w-24 text-yellow-400 animate-pulse" />
            <span className="text-4xl font-bold text-yellow-400 mt-4">Tuyệt vời!</span>
          </div>
        </div>
      )}

      {/* Incorrect Animation */}
      {showIncorrectAnimation && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="animate-shake flex flex-col items-center">
            <div className="text-4xl font-bold text-red-400">Chưa đúng!</div>
            <div className="text-xl text-red-300 mt-2">Hãy thử lại</div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-indigo-800/50 backdrop-blur-sm border-b border-indigo-700/50 flex-shrink-0 py-3 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button
                variant="ghost"
                size="sm"
                className="text-indigo-200 hover:text-white hover:bg-indigo-700/50 rounded-full"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="flex items-center">
              <span className="text-2xl mr-2">{languageFlags[language as keyof typeof languageFlags]}</span>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-200 to-indigo-100 text-transparent bg-clip-text">
                {languageNames[language as keyof typeof languageNames]}
              </h1>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center space-x-3">
            <Card className="bg-indigo-700/30 border-indigo-600/30 px-3 py-1 flex items-center space-x-1">
              <span className="text-yellow-300 text-sm">⭐</span>
              <span className="text-indigo-100 text-sm">{points}</span>
            </Card>
            <Card className="bg-indigo-700/30 border-indigo-600/30 px-3 py-1 flex items-center space-x-1">
              <Award className="h-4 w-4 text-yellow-300" />
              <span className="text-indigo-100 text-sm">{streak}</span>
            </Card>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="container mx-auto px-4 py-2 flex items-center space-x-4">
        <div className="text-xs text-indigo-300">
          {currentIndex + 1}/{sentences.length}
        </div>
        <div className="flex-1">
          <Progress value={progress} className="h-2 bg-indigo-700/50">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-indigo-300 transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </Progress>
        </div>
        <div className="flex space-x-1">
          {sentences.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full ${
                completedSentences.has(idx)
                  ? "bg-green-400"
                  : idx === currentIndex
                    ? "bg-indigo-300"
                    : "bg-indigo-700/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 py-2 flex flex-col min-h-0">
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto mb-4 pr-2 scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-indigo-900/30">
          <div className="space-y-4 pb-2">
            {chatMessages.map((message, idx) => (
              <div key={idx} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                {message.type === "user" && (
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.isCorrect === true
                        ? "bg-green-500/20 border border-green-500/30 text-green-100"
                        : message.isCorrect === false
                          ? "bg-red-500/20 border border-red-500/30 text-red-100"
                          : "bg-indigo-600/50 border border-indigo-500/30 text-indigo-100"
                    }`}
                  >
                    {message.content}
                    {message.isCorrect === true && <span className="ml-2 text-green-300">✓</span>}
                    {message.isCorrect === false && <span className="ml-2 text-red-300">✗</span>}
                  </div>
                )}

                {message.type === "assistant" && (
                  <div className="max-w-[80%] bg-indigo-700/40 border border-indigo-600/30 rounded-2xl px-4 py-2 text-indigo-100">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-xs font-medium text-indigo-300">Dịch câu này:</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 rounded-full bg-indigo-600/30 hover:bg-indigo-600/50"
                      >
                        <Volume2 className="h-3 w-3 text-indigo-300" />
                      </Button>
                    </div>
                    <div className="text-lg">{message.content}</div>
                  </div>
                )}

                {message.type === "system" && (
                  <div className="max-w-[80%] bg-indigo-800/30 border border-indigo-700/30 rounded-2xl px-4 py-2 text-indigo-300 text-sm">
                    {message.content}
                  </div>
                )}

                {message.type === "feedback" && (
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.isCorrect
                        ? "bg-green-500/20 border border-green-500/30 text-green-100"
                        : "bg-red-500/20 border border-red-500/30 text-red-100"
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`text-xs font-medium ${message.isCorrect ? "text-green-300" : "text-red-300"}`}>
                        {message.isCorrect ? "Chính xác!" : "Chưa đúng"}
                      </span>
                    </div>
                    {message.content}
                  </div>
                )}

                {message.type === "hint" && (
                  <div className="max-w-[80%] bg-yellow-500/20 border border-yellow-500/30 rounded-2xl px-4 py-2 text-yellow-100">
                    <div className="flex items-center space-x-2 mb-1">
                      <Lightbulb className="h-4 w-4 text-yellow-300" />
                      <span className="text-xs font-medium text-yellow-300">Gợi ý</span>
                    </div>
                    {message.content}
                  </div>
                )}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div
          className={`bg-indigo-800/30 backdrop-blur-sm border border-indigo-700/50 rounded-xl p-3 transition-all duration-300 ${
            showAnimation ? "animate-pulse" : ""
          }`}
        >
          <div className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder={`Dịch sang ${languageNames[language as keyof typeof languageNames]}...`}
                className="w-full bg-indigo-700/30 border border-indigo-600/50 rounded-lg px-4 py-3 text-white placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                disabled={showResult && isCorrect}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && userAnswer.trim() && !showResult) {
                    checkAnswer()
                  }
                }}
              />
              {showResult && !isCorrect && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full bg-indigo-600/50 hover:bg-indigo-600/70"
                  onClick={tryAgain}
                >
                  <RotateCcw className="h-4 w-4 text-indigo-300" />
                </Button>
              )}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full bg-indigo-600/50 hover:bg-indigo-600/70"
              onClick={toggleHint}
            >
              <Lightbulb className={`h-5 w-5 ${showHint ? "text-yellow-300" : "text-indigo-300"}`} />
            </Button>

            <Button
              className={`rounded-full px-5 py-2 ${
                showResult && isCorrect
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-indigo-500 hover:bg-indigo-600 text-white"
              }`}
              onClick={showResult && isCorrect ? nextSentence : checkAnswer}
              disabled={!userAnswer.trim() && !showResult}
            >
              {showResult && isCorrect ? (
                currentIndex < sentences.length - 1 ? (
                  "Tiếp tục"
                ) : (
                  "Hoàn thành"
                )
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Gửi
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          50% { transform: translateX(5px); }
          75% { transform: translateX(-5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: rgba(79, 70, 229, 0.1);
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(79, 70, 229, 0.5);
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(79, 70, 229, 0.7);
        }
      `}</style>
    </div>
  )
}
