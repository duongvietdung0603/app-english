import { type NextRequest, NextResponse } from "next/server"

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

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Find matching account
    const account = mockAccounts.find((acc) => acc.email === email && acc.password === password)

    if (account) {
      const { password: _, ...userWithoutPassword } = account
      return NextResponse.json({
        success: true,
        user: userWithoutPassword,
      })
    } else {
      return NextResponse.json({ success: false, message: "Email hoặc mật khẩu không đúng!" }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
  }
}
