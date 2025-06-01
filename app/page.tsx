import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Globe, Users, Zap } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Globe className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">LinguaLearn</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/auth/demo-accounts">
              <Button variant="ghost">Demo Accounts</Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="ghost">Đăng nhập</Button>
            </Link>
            <Link href="/auth/register">
              <Button>Đăng ký</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          Học ngôn ngữ mới một cách <span className="text-blue-600">thông minh</span>
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Nền tảng học tiếng Anh và tiếng Nhật với phương pháp dịch thuật tương tác, giúp bạn nắm vững ngôn ngữ từ cơ
          bản đến nâng cao.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/auth/register">
            <Button size="lg" className="px-8 py-3">
              Bắt đầu học ngay
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" size="lg" className="px-8 py-3">
              Khám phá khóa học
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">Tính năng nổi bật</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <BookOpen className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle>Học từ vựng</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Hệ thống từ vựng phong phú với các chủ đề đa dạng</CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="h-10 w-10 text-green-600 mb-2" />
              <CardTitle>Dịch tương tác</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Luyện tập dịch từ câu đơn đến đoạn văn phức tạp</CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-10 w-10 text-purple-600 mb-2" />
              <CardTitle>Phản hồi thông minh</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Hệ thống đánh giá và gợi ý cải thiện tức thì</CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Globe className="h-10 w-10 text-orange-600 mb-2" />
              <CardTitle>Đa ngôn ngữ</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Hỗ trợ học tiếng Anh và tiếng Nhật</CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Languages */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">Ngôn ngữ được hỗ trợ</h3>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <div className="text-6xl mb-4">🇺🇸</div>
              <CardTitle className="text-2xl">Tiếng Anh</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-lg">
                Học tiếng Anh từ cơ bản đến nâng cao với phương pháp dịch thuật hiệu quả
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="text-6xl mb-4">🇯🇵</div>
              <CardTitle className="text-2xl">Tiếng Nhật</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-lg">
                Khám phá tiếng Nhật với hệ thống học tập tương tác và thú vị
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Globe className="h-6 w-6" />
            <span className="text-xl font-bold">LinguaLearn</span>
          </div>
          <p className="text-gray-400">© 2024 LinguaLearn. Nền tảng học ngôn ngữ thông minh.</p>
        </div>
      </footer>
    </div>
  )
}
