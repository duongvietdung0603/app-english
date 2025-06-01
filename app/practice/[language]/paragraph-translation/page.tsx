"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Lightbulb, Send, BookOpen, Flame, Zap, Target } from "lucide-react"
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
  const [credits, setCredits] = useState(5)
  const [points, setPoints] = useState(120)
  const [streak, setStreak] = useState(3)

  const paragraphInfo = paragraphData[language as keyof typeof paragraphData] || paragraphData.english
  const currentSentence = paragraphInfo.sentences[currentSentenceIndex]
  const progress = ((currentSentenceIndex + 1) / paragraphInfo.sentences.length) * 100

  const checkAnswer = () => {
    const correct = userAnswer.trim().toLowerCase() === currentSentence.correct.toLowerCase()
    setIsCorrect(correct)
    setShowResult(true)
    if (correct) {
      setCompletedSentences((prev) => new Set([...prev, currentSentenceIndex]))
      setTranslatedSentences((prev) => ({ ...prev, [currentSentenceIndex]: currentSentence.correct }))
      setPoints(points + 10)
      setCredits(credits + 1)
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

  const renderParagraph = () => {
    return paragraphInfo.sentences.map((sentence, index) => {
      let displayText = sentence.vietnamese
      let textColor = "text-gray-400"
      let bgColor = ""

      // If sentence is completed, show translated version in green
      if (completedSentences.has(index)) {
        displayText = translatedSentences[index] || sentence.correct
        textColor = "text-green-400"
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

      return (
        <span
          key={index}
          className={`${textColor} ${bgColor} ${
            index === currentSentenceIndex ? "px-1 py-0.5 rounded" : ""
          } transition-all duration-500 ease-in-out`}
        >
          {displayText}
          {index < paragraphInfo.sentences.length - 1 ? " " : ""}
        </span>
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
              <h1 className="text-2xl font-bold text-yellow-400">{paragraphInfo.title}</h1>
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
                Progress: {currentSentenceIndex + 1}/{paragraphInfo.sentences.length} sentences
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
          {/* Paragraph Display */}
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-8">
              <div className="text-lg leading-relaxed space-y-4">
                <div className="text-2xl font-bold text-white mb-6">Hi Emma,</div>
                <div className="text-lg leading-8">{renderParagraph()}</div>
                <div className="text-gray-400 mt-8">
                  <div>Trân trọng,</div>
                  <div className="mt-2">Michael</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Sentence Info */}
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="text-sm text-gray-400 mb-2">
                Đang dịch câu {currentSentenceIndex + 1}/{paragraphInfo.sentences.length}:
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
                  <Button
                    onClick={showResult && isCorrect ? nextSentence : checkAnswer}
                    disabled={!userAnswer.trim() && !showResult}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
                  >
                    {showResult && isCorrect ? (
                      currentSentenceIndex < paragraphInfo.sentences.length - 1 ? (
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
                {Math.round((completedSentences.size / Math.max(currentSentenceIndex + 1, 1)) * 100)}%
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
                      Câu đã được thay thế trong đoạn văn và chuyển sang màu xanh. Tiếp tục với câu tiếp theo! 🎉
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
                    <div className="text-xs text-gray-400">Hãy thử lại để câu được thay thế trong đoạn văn.</div>
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
                  <div className="text-sm font-medium">Translator</div>
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
                  <span className="text-yellow-400">
                    {paragraphInfo.sentences.length - completedSentences.size} sentences
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total:</span>
                  <span className="text-white">{paragraphInfo.sentences.length} sentences</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
