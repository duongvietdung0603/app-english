"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Globe } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case "Configuration":
        return "Có lỗi cấu hình xảy ra. Vui lòng thử lại sau."
      case "AccessDenied":
        return "Truy cập bị từ chối. Bạn không có quyền đăng nhập."
      case "Verification":
        return "Token xác thực không hợp lệ hoặc đã hết hạn."
      default:
        return "Có lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại."
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-800/50 border-slate-700/50">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Globe className="h-4 w-4 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-100">LinguaLearn</span>
          </div>
          <div className="flex items-center justify-center mb-4">
            <AlertCircle className="h-12 w-12 text-red-400" />
          </div>
          <CardTitle className="text-2xl text-slate-100">Lỗi đăng nhập</CardTitle>
          <CardDescription className="text-slate-400">{getErrorMessage(error)}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
            <Link href="/auth/login">Thử lại</Link>
          </Button>
          <Button asChild variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700">
            <Link href="/">Về trang chủ</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
