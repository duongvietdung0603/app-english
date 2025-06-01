import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, User, Mail, Lock } from "lucide-react"
import Link from "next/link"

const mockAccounts = [
  {
    email: "english@test.com",
    password: "123456",
    name: "John English",
    preferredLanguage: "english",
    avatar: "🇺🇸",
    description: "Tài khoản chuyên học tiếng Anh",
  },
  {
    email: "japanese@test.com",
    password: "123456",
    name: "Tanaka Japanese",
    preferredLanguage: "japanese",
    avatar: "🇯🇵",
    description: "アカウント日本語を学ぶ (Tài khoản học tiếng Nhật)",
  },
  {
    email: "admin@test.com",
    password: "admin123",
    name: "Admin User",
    preferredLanguage: "both",
    avatar: "👨‍💼",
    description: "Tài khoản quản trị - có thể học cả 2 ngôn ngữ",
  },
]

export default function DemoAccountsPage() {
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
            <Link href="/auth/login">
              <Button variant="ghost">Đăng nhập</Button>
            </Link>
            <Link href="/auth/register">
              <Button>Đăng ký</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Tài khoản Demo</h2>
          <p className="text-xl text-gray-600 mb-8">Sử dụng các tài khoản demo để trải nghiệm hệ thống học ngôn ngữ</p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-yellow-800">
              <strong>Lưu ý:</strong> Mỗi tài khoản được cấu hình sẵn ngôn ngữ học tập riêng biệt
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {mockAccounts.map((account, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="text-4xl mb-2">{account.avatar}</div>
                <CardTitle className="text-xl">{account.name}</CardTitle>
                <CardDescription>{account.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded">{account.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Lock className="h-4 w-4 text-gray-500" />
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded">{account.password}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Globe className="h-4 w-4 text-gray-500" />
                    <span className="capitalize">
                      {account.preferredLanguage === "both"
                        ? "Cả hai ngôn ngữ"
                        : account.preferredLanguage === "english"
                          ? "Tiếng Anh"
                          : "Tiếng Nhật"}
                    </span>
                  </div>
                </div>

                <Link href="/auth/login" className="block">
                  <Button className="w-full">
                    <User className="h-4 w-4 mr-2" />
                    Đăng nhập với tài khoản này
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-3xl mx-auto">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Hướng dẫn sử dụng tài khoản demo</h3>
            <div className="text-blue-800 space-y-2 text-left">
              <p>
                • <strong>Tài khoản English:</strong> Chỉ có thể truy cập các khóa học tiếng Anh
              </p>
              <p>
                • <strong>Tài khoản Japanese:</strong> Chỉ có thể truy cập các khóa học tiếng Nhật
              </p>
              <p>
                • <strong>Tài khoản Admin:</strong> Có thể truy cập cả hai ngôn ngữ
              </p>
              <p>• Copy email và password từ thẻ tài khoản để đăng nhập</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link href="/" className="text-gray-600 hover:underline">
            ← Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  )
}
