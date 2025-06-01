"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, FileText, MessageSquare, User, LogOut, Globe, TrendingUp, Target, Clock } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ name: string; email: string; preferredLanguage: string; avatar: string } | null>(
    null,
  )

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push("/auth/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  const getLanguageInfo = () => {
    if (!user) return null

    if (user.preferredLanguage === "english") {
      return {
        name: "Tiếng Anh",
        flag: "🇺🇸",
        color: "blue",
        greeting: "Welcome back!",
        description: "Tiếp tục hành trình học tiếng Anh của bạn",
      }
    } else if (user.preferredLanguage === "japanese") {
      return {
        name: "Tiếng Nhật",
        flag: "🇯🇵",
        color: "red",
        greeting: "おかえりなさい！",
        description: "日本語の勉強を続けましょう",
      }
    } else {
      return {
        name: "Đa ngôn ngữ",
        flag: "🌍",
        color: "purple",
        greeting: "Welcome back!",
        description: "Chọn ngôn ngữ bạn muốn học hôm nay",
      }
    }
  }

  const getAvailableLanguages = () => {
    if (!user) return []

    if (user.preferredLanguage === "both") {
      return ["english", "japanese"]
    }
    return [user.preferredLanguage]
  }

  const languageInfo = getLanguageInfo()
  const availableLanguages = getAvailableLanguages()

  if (!user || !languageInfo) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Globe className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">LinguaLearn</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{user.avatar}</span>
              <User className="h-5 w-5 text-gray-600" />
              <span className="text-sm text-gray-700">{user.name}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Đăng xuất
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-6xl">{languageInfo.flag}</span>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{languageInfo.greeting}</h2>
              <p className="text-xl text-gray-600">{user.name}</p>
              <p className="text-gray-500">{languageInfo.description}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        {user.preferredLanguage !== "both" ? (
          // Single Language Layout
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6">Hoạt động học tập</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href={`/learn/${user.preferredLanguage}/vocabulary`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader className="text-center">
                    <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <CardTitle className="text-xl">Học từ vựng</CardTitle>
                    <CardDescription>Mở rộng vốn từ vựng với flashcards tương tác</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">127</div>
                      <p className="text-sm text-gray-600">từ đã học</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href={`/practice/${user.preferredLanguage}/sentence-translation`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader className="text-center">
                    <MessageSquare className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <CardTitle className="text-xl">Dịch câu</CardTitle>
                    <CardDescription>Luyện tập dịch từng câu một cách chính xác</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">45</div>
                      <p className="text-sm text-gray-600">câu hôm nay</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href={`/practice/${user.preferredLanguage}/paragraph-translation`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader className="text-center">
                    <FileText className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                    <CardTitle className="text-xl">Dịch đoạn văn</CardTitle>
                    <CardDescription>Thử thách với các đoạn văn phức tạp</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">12</div>
                      <p className="text-sm text-gray-600">đoạn hoàn thành</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        ) : (
          // Multi Language Layout for Admin
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6">Chọn ngôn ngữ học hôm nay</h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <div className="text-6xl mb-4">🇺🇸</div>
                  <CardTitle className="text-2xl">Tiếng Anh</CardTitle>
                  <CardDescription>English Learning Path</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/learn/english/vocabulary" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Học từ vựng
                    </Button>
                  </Link>
                  <Link href="/practice/english/sentence-translation" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Dịch câu
                    </Button>
                  </Link>
                  <Link href="/practice/english/paragraph-translation" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Dịch đoạn văn
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <div className="text-6xl mb-4">🇯🇵</div>
                  <CardTitle className="text-2xl">Tiếng Nhật</CardTitle>
                  <CardDescription>Japanese Learning Path</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/learn/japanese/vocabulary" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Học từ vựng
                    </Button>
                  </Link>
                  <Link href="/practice/japanese/sentence-translation" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Dịch câu
                    </Button>
                  </Link>
                  <Link href="/practice/japanese/paragraph-translation" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Dịch đoạn văn
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Progress Overview */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-6">Tổng quan tiến độ</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Streak hiện tại</CardTitle>
                <TrendingUp className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">7 ngày</div>
                <p className="text-xs text-gray-600">Tiếp tục phát huy!</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Độ chính xác</CardTitle>
                <Target className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">85%</div>
                <p className="text-xs text-gray-600">Tuần này</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Thời gian học</CardTitle>
                <Clock className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">2.5h</div>
                <p className="text-xs text-gray-600">Hôm nay</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cấp độ</CardTitle>
                <Globe className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">Level 5</div>
                <p className="text-xs text-gray-600">Trung cấp</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="text-2xl font-semibold mb-6">Hoạt động gần đây</h3>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Hoàn thành bài học từ vựng "Gia đình"</p>
                    <p className="text-xs text-gray-500">2 giờ trước</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Dịch thành công 15 câu liên tiếp</p>
                    <p className="text-xs text-gray-500">5 giờ trước</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Đạt streak 7 ngày</p>
                    <p className="text-xs text-gray-500">Hôm qua</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
