import { type NextRequest, NextResponse } from "next/server"

const sentenceData = {
  english: [
    {
      id: 1,
      vietnamese: "Tôi đang học tiếng Anh.",
      correct: "I am learning English.",
      hints: ["Sử dụng thì hiện tại tiếp diễn", "Chủ ngữ là 'I'"],
    },
    {
      id: 2,
      vietnamese: "Hôm nay trời đẹp quá.",
      correct: "The weather is beautiful today.",
      hints: ["'Trời' có thể dịch là 'weather'", "Sử dụng 'beautiful' cho 'đẹp'"],
    },
    {
      id: 3,
      vietnamese: "Tôi muốn uống cà phê.",
      correct: "I want to drink coffee.",
      hints: ["Sử dụng 'want to' cho 'muốn'", "'uống' là 'drink'"],
    },
    {
      id: 4,
      vietnamese: "Cô ấy là một giáo viên.",
      correct: "She is a teacher.",
      hints: ["'Cô ấy' là 'She'", "Sử dụng 'a' trước nghề nghiệp"],
    },
    {
      id: 5,
      vietnamese: "Chúng tôi sống ở Việt Nam.",
      correct: "We live in Vietnam.",
      hints: ["'Chúng tôi' là 'We'", "Sử dụng 'in' cho tên quốc gia"],
    },
    {
      id: 6,
      vietnamese: "Anh ấy thích đọc sách.",
      correct: "He likes reading books.",
      hints: ["'Anh ấy' là 'He'", "'thích' là 'like'"],
    },
  ],
  japanese: [
    {
      id: 1,
      vietnamese: "Tôi đang học tiếng Nhật.",
      correct: "私は日本語を勉強しています。",
      hints: ["私 (watashi) = tôi", "勉強 (benkyou) = học"],
    },
    {
      id: 2,
      vietnamese: "Hôm nay trời đẹp quá.",
      correct: "今日はとてもいい天気です。",
      hints: ["今日 (kyou) = hôm nay", "いい天気 (ii tenki) = thời tiết đẹp"],
    },
    {
      id: 3,
      vietnamese: "Tôi muốn uống cà phê.",
      correct: "コーヒーを飲みたいです。",
      hints: ["コーヒー (koohii) = cà phê", "飲みたい (nomitai) = muốn uống"],
    },
    {
      id: 4,
      vietnamese: "Cô ấy là một giáo viên.",
      correct: "彼女は先生です。",
      hints: ["彼女 (kanojo) = cô ấy", "先生 (sensei) = giáo viên"],
    },
    {
      id: 5,
      vietnamese: "Chúng tôi sống ở Việt Nam.",
      correct: "私たちはベトナムに住んでいます。",
      hints: ["私たち (watashitachi) = chúng tôi", "住む (sumu) = sống"],
    },
    {
      id: 6,
      vietnamese: "Anh ấy thích đọc sách.",
      correct: "彼は本を読むのが好きです。",
      hints: ["彼 (kare) = anh ấy", "好き (suki) = thích"],
    },
  ],
}

export async function GET(request: NextRequest, { params }: { params: { language: string } }) {
  try {
    const language = params.language as keyof typeof sentenceData

    if (!sentenceData[language]) {
      return NextResponse.json({ success: false, message: "Language not supported" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: sentenceData[language],
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
  }
}
