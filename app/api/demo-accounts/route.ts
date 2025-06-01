import { NextResponse } from "next/server"

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

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: mockAccounts,
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
  }
}
