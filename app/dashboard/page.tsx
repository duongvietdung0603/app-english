"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, FileText, MessageSquare, User, LogOut, Globe } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

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

  if (!user) return null

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
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Chào mừng trở lại, {user.name}!</h2>
          <p className="text-gray-600">Chọn ngôn ngữ và phương thức học tập phù hợp với bạn</p>
        </div>

        {/* Language Selection */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6">Chọn ngôn ngữ học</h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <div className="text-6xl mb-4">🇺🇸</div>
                <CardTitle className="text-2xl">Tiếng Anh</CardTitle>
                <CardDescription>Học tiếng Anh từ cơ bản đến nâng cao</CardDescription>
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
                <CardDescription>Khám phá tiếng Nhật với phương pháp hiệu quả</CardDescription>
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

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Từ vựng đã học</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">127</div>
              <p className="text-sm text-gray-600">từ trong tuần này</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Câu đã dịch</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">45</div>
              <p className="text-sm text-gray-600">câu hôm nay</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Độ chính xác</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">85%</div>
              <p className="text-sm text-gray-600">trung bình tuần này</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
