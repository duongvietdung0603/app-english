"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, MessageSquare, Clock, Target, ChevronRight, Star, Award, Zap } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"

interface SentenceTopic {
  id: number
  title: string
  description: string
  icon: string
  level: string
  sentencesCount: number
  difficulty: string
  color: string
  estimatedTime: string
  topics: string[]
}

export default function SentenceTopicsPage() {
  const params = useParams()
  const language = params.language as string
  const [topics, setTopics] = useState<SentenceTopic[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedLevel, setSelectedLevel] = useState<string>("All")

  const levels = ["All", "Beginner", "Intermediate", "Advanced"]

  // Fetch topics data
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch(`/api/sentence-topics/${language}`)
        const data = await response.json()

        if (data.success) {
          setTopics(data.data)
        }
      } catch (error) {
        console.error("Error fetching sentence topics:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTopics()
  }, [language])

  const filteredTopics = selectedLevel === "All" ? topics : topics.filter((topic) => topic.level === selectedLevel)

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      blue: "from-blue-500 to-blue-600",
      emerald: "from-emerald-500 to-emerald-600",
      orange: "from-orange-500 to-orange-600",
      purple: "from-purple-500 to-purple-600",
      slate: "from-slate-500 to-slate-600",
      red: "from-red-500 to-red-600",
      green: "from-green-500 to-green-600",
      cyan: "from-cyan-500 to-cyan-600",
    }
    return colorMap[color] || "from-blue-500 to-blue-600"
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "Intermediate":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      case "Advanced":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      default:
        return "bg-slate-500/20 text-slate-300 border-slate-500/30"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-400"
      case "Medium":
        return "text-yellow-400"
      case "Hard":
        return "text-red-400"
      default:
        return "text-slate-400"
    }
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
        <div className="text-slate-400">Loading sentence topics...</div>
      </div>
    )
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
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-slate-100">Sentence Translation Topics</h1>
                  <p className="text-xs text-slate-400">
                    {languageFlags[language as keyof typeof languageFlags]}{" "}
                    {languageNames[language as keyof typeof languageNames]} Practice
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-slate-400" />
                <span className="text-sm text-slate-300">{topics.length} Topics</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4 text-emerald-400" />
                <span className="text-sm text-emerald-300">
                  {topics.reduce((acc, topic) => acc + topic.sentencesCount, 0)} Sentences
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-100 mb-4">Choose Your Practice Topic</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Select a topic to practice sentence translation with interactive feedback and progressive difficulty.
          </p>
        </div>

        {/* Level Filter */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 bg-slate-800/50 p-1 rounded-lg">
            {levels.map((level) => (
              <Button
                key={level}
                variant={selectedLevel === level ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedLevel(level)}
                className={`${
                  selectedLevel === level
                    ? "bg-emerald-600 text-white"
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-700/50"
                }`}
              >
                {level}
              </Button>
            ))}
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {filteredTopics.map((topic) => (
            <Card
              key={topic.id}
              className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/70 transition-all group cursor-pointer"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${getColorClasses(topic.color)} rounded-lg flex items-center justify-center text-2xl`}
                  >
                    {topic.icon}
                  </div>
                  <div className="flex flex-col space-y-1">
                    <Badge className={`text-xs ${getLevelColor(topic.level)}`}>{topic.level}</Badge>
                    <Badge
                      variant="outline"
                      className={`text-xs border-slate-600 ${getDifficultyColor(topic.difficulty)}`}
                    >
                      {topic.difficulty}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-lg text-slate-100 group-hover:text-emerald-400 transition-colors">
                  {topic.title}
                </CardTitle>
                <CardDescription className="text-slate-400 text-sm">{topic.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center space-x-1">
                    <MessageSquare className="h-3 w-3 text-slate-500" />
                    <span className="text-slate-400">{topic.sentencesCount} sentences</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3 text-slate-500" />
                    <span className="text-slate-400">{topic.estimatedTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Target className="h-3 w-3 text-slate-500" />
                    <span className="text-slate-400">Interactive</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Zap className="h-3 w-3 text-slate-500" />
                    <span className="text-slate-400">AI Feedback</span>
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Progress</span>
                    <span className="text-slate-400">0%</span>
                  </div>
                  <Progress value={0} className="h-1.5 bg-slate-700/50" />
                </div>

                {/* Topics Preview */}
                <div className="space-y-1">
                  <div className="text-xs font-medium text-slate-400">Practice areas:</div>
                  <div className="flex flex-wrap gap-1">
                    {topic.topics.slice(0, 2).map((subtopic, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-slate-600 text-slate-400">
                        {subtopic}
                      </Badge>
                    ))}
                    {topic.topics.length > 2 && (
                      <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
                        +{topic.topics.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <Link href={`/practice/${language}/sentence-translation?topic=${topic.id}`} className="block">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 group-hover:bg-emerald-500 transition-all">
                    Start Practice
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredTopics.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-semibold text-slate-300 mb-2">No topics found</h3>
            <p className="text-slate-400">Try selecting a different level filter.</p>
          </div>
        )}

        {/* Achievement Section */}
        <div className="mt-12 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-100">Master Sentence Translation</h3>
                <p className="text-slate-400">
                  Complete all topics to become a sentence translation expert and unlock special achievements.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="text-yellow-400 font-semibold">0 / {topics.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
