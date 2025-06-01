"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Globe } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("english@test.com")
  const [password, setPassword] = useState("123456")

  // Mock accounts with predefined languages
  const mockAccounts = [
    {
      email: "english@test.com",
      password: "123456",
      name: "John English",
      preferredLanguage: "english",
      avatar: "🇺🇸",
    },
    {
      email: "japanese@test.com",
      password: "123456",
      name: "Tanaka Japanese",
      preferredLanguage: "japanese",
      avatar: "🇯🇵",
    },
    {
      email: "admin@test.com",
      password: "admin123",
      name: "Admin User",
      preferredLanguage: "both",
      avatar: "👨‍💼",
    },
  ]

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // Find matching account
    const account = mockAccounts.find((acc) => acc.email === email && acc.password === password)

    if (account) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: account.email,
          name: account.name,
          preferredLanguage: account.preferredLanguage,
          avatar: account.avatar,
        }),
      )
      router.push("/dashboard")
    } else {
      alert("Email hoặc mật khẩu không đúng!")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Globe className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold">LinguaLearn</span>
          </div>
          <CardTitle className="text-2xl">Đăng nhập</CardTitle>
          <CardDescription>Đăng nhập để tiếp tục hành trình học ngôn ngữ</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Đăng nhập
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Chưa có tài khoản?{" "}
            <Link href="/auth/register" className="text-blue-600 hover:underline">
              Đăng ký ngay
            </Link>
          </div>
          <div className="mt-4 text-center">
            <Link href="/" className="text-sm text-gray-600 hover:underline">
              ← Về trang chủ
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
