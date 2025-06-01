import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, confirmPassword } = await request.json()

    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json({ success: false, message: "Vui lòng điền đầy đủ thông tin" }, { status: 400 })
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ success: false, message: "Mật khẩu xác nhận không khớp" }, { status: 400 })
    }

    // Mock successful registration
    const newUser = {
      email,
      name,
      preferredLanguage: "both",
      avatar: "👤",
    }

    return NextResponse.json({
      success: true,
      user: newUser,
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
  }
}
