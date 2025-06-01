"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, User, Mail, Lock } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

interface DemoAccount {
  email: string
  password: string
  name: string
  preferredLanguage: string
  avatar: string
  description: string
}

export default function DemoAccountsPage() {
  const [accounts, setAccounts] = useState<DemoAccount[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch("/api/demo-accounts")
        const data = await response.json()

        if (data.success) {
          setAccounts(data.data)
        }
      } catch (error) {
        console.error("Error fetching demo accounts:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAccounts()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    )
  }

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

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-100 mb-4">Tài khoản Demo</h2>
          <p className="text-xl text-slate-400 mb-8">Sử dụng các tài khoản demo để trải nghiệm hệ thống học ngôn ngữ</p>
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-yellow-300">
              <strong>Lưu ý:</strong> Mỗi tài khoản được cấu hình sẵn ngôn ngữ học tập riêng biệt
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {accounts.map((account, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/70 transition-all">
              <CardHeader className="text-center">
                <div className="text-4xl mb-2">{account.avatar}</div>
                <CardTitle className="text-xl text-slate-100">{account.name}</CardTitle>
                <CardDescription className="text-slate-400">{account.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="h-4 w-4 text-slate-500" />
                    <span className="font-mono bg-slate-700/50 px-2 py-1 rounded text-slate-300">{account.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Lock className="h-4 w-4 text-slate-500" />
                    <span className="font-mono bg-slate-700/50 px-2 py-1 rounded text-slate-300">
                      {account.password}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Globe className="h-4 w-4 text-slate-500" />
                    <span className="capitalize text-slate-300">
                      {account.preferredLanguage === "both"
                        ? "Cả hai ngôn ngữ"
                        : account.preferredLanguage === "english"
                          ? "Tiếng Anh"
                          : "Tiếng Nhật"}
                    </span>
                  </div>
                </div>

                <Link href="/auth/login" className="block">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <User className="h-4 w-4 mr-2" />
                    Đăng nhập với tài khoản này
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 max-w-3xl mx-auto">
            <h3 className="text-lg font-semibold text-blue-300 mb-3">Hướng dẫn sử dụng tài khoản demo</h3>
            <div className="text-blue-200 space-y-2 text-left">
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
          <Link href="/" className="text-slate-400 hover:underline">
            ← Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  )
}
