import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Globe, Users, Zap, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Header */}
      <header className="bg-slate-800/90 backdrop-blur-sm border-b border-slate-700/50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Globe className="h-4 w-4 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-slate-100">LinguaLearn</h1>
              <p className="text-xs text-slate-400">Language Learning Platform</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/auth/demo-accounts">
              <Button variant="ghost" className="text-slate-400 hover:text-slate-100 hover:bg-slate-700/50">
                Demo Accounts
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="ghost" className="text-slate-400 hover:text-slate-100 hover:bg-slate-700/50">
                Đăng nhập
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="bg-blue-600 hover:bg-blue-700">Đăng ký</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-slate-900/20 z-0"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-6">
              Học ngôn ngữ mới một cách <span className="text-blue-400">thông minh</span>
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Nền tảng học tiếng Anh và tiếng Nhật với phương pháp dịch thuật tương tác, giúp bạn nắm vững ngôn ngữ từ
              cơ bản đến nâng cao.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/auth/register">
                <Button size="lg" className="px-8 py-6 bg-blue-600 hover:bg-blue-700 text-lg">
                  Bắt đầu học ngay
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-6 border-slate-600 text-slate-300 hover:bg-slate-800 text-lg"
                >
                  Khám phá khóa học
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-slate-800/30">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12">Tính năng nổi bật</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/70 transition-all">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-slate-100">Học từ vựng</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-400">
                  Hệ thống từ vựng phong phú với các chủ đề đa dạng
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/70 transition-all">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-slate-100">Dịch tương tác</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-400">
                  Luyện tập dịch từ câu đơn đến đoạn văn phức tạp
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/70 transition-all">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-slate-100">Phản hồi thông minh</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-400">
                  Hệ thống đánh giá và gợi ý cải thiện tức thì
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/70 transition-all">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-slate-100">Đa ngôn ngữ</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-400">Hỗ trợ học tiếng Anh và tiếng Nhật</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Languages */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12">Ngôn ngữ được hỗ trợ</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/70 transition-all text-center">
              <CardHeader>
                <div className="text-6xl mb-4">🇺🇸</div>
                <CardTitle className="text-2xl text-slate-100">Tiếng Anh</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-400 text-lg">
                  Học tiếng Anh từ cơ bản đến nâng cao với phương pháp dịch thuật hiệu quả
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/70 transition-all text-center">
              <CardHeader>
                <div className="text-6xl mb-4">🇯🇵</div>
                <CardTitle className="text-2xl text-slate-100">Tiếng Nhật</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-400 text-lg">
                  Khám phá tiếng Nhật với hệ thống học tập tương tác và thú vị
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800/90 border-t border-slate-700/50 py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Globe className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-100">LinguaLearn</span>
          </div>
          <p className="text-slate-400">© 2024 LinguaLearn. Nền tảng học ngôn ngữ thông minh.</p>
        </div>
      </footer>
    </div>
  )
}
