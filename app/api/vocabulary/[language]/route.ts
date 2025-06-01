import { type NextRequest, NextResponse } from "next/server"

const vocabularyData = {
  english: [
    { id: 1, word: "Hello", translation: "Xin chào", pronunciation: "/həˈloʊ/", example: "Hello, how are you?" },
    {
      id: 2,
      word: "Thank you",
      translation: "Cảm ơn",
      pronunciation: "/θæŋk juː/",
      example: "Thank you for your help.",
    },
    {
      id: 3,
      word: "Good morning",
      translation: "Chào buổi sáng",
      pronunciation: "/ɡʊd ˈmɔːrnɪŋ/",
      example: "Good morning, everyone!",
    },
    {
      id: 4,
      word: "Beautiful",
      translation: "Đẹp",
      pronunciation: "/ˈbjuːtɪfəl/",
      example: "The sunset is beautiful.",
    },
    {
      id: 5,
      word: "Important",
      translation: "Quan trọng",
      pronunciation: "/ɪmˈpɔːrtənt/",
      example: "This is very important.",
    },
    { id: 6, word: "Family", translation: "Gia đình", pronunciation: "/ˈfæməli/", example: "I love my family." },
    { id: 7, word: "Friend", translation: "Bạn bè", pronunciation: "/frend/", example: "She is my best friend." },
    {
      id: 8,
      word: "School",
      translation: "Trường học",
      pronunciation: "/skuːl/",
      example: "I go to school every day.",
    },
    { id: 9, word: "House", translation: "Ngôi nhà", pronunciation: "/haʊs/", example: "This is my house." },
    { id: 10, word: "Water", translation: "Nước", pronunciation: "/ˈwɔːtər/", example: "I drink water every day." },
  ],
  japanese: [
    {
      id: 1,
      word: "こんにちは",
      translation: "Xin chào",
      pronunciation: "Konnichiwa",
      example: "こんにちは、元気ですか？",
    },
    { id: 2, word: "ありがとう", translation: "Cảm ơn", pronunciation: "Arigatou", example: "ありがとうございます。" },
    {
      id: 3,
      word: "おはよう",
      translation: "Chào buổi sáng",
      pronunciation: "Ohayou",
      example: "おはようございます！",
    },
    { id: 4, word: "きれい", translation: "Đẹp", pronunciation: "Kirei", example: "この花はきれいです。" },
    { id: 5, word: "大切", translation: "Quan trọng", pronunciation: "Taisetsu", example: "これは大切なことです。" },
    { id: 6, word: "家族", translation: "Gia đình", pronunciation: "Kazoku", example: "家族が大好きです。" },
    { id: 7, word: "友達", translation: "Bạn bè", pronunciation: "Tomodachi", example: "彼は私の友達です。" },
    { id: 8, word: "学校", translation: "Trường học", pronunciation: "Gakkou", example: "毎日学校に行きます。" },
    { id: 9, word: "家", translation: "Ngôi nhà", pronunciation: "Ie", example: "これは私の家です。" },
    { id: 10, word: "水", translation: "Nước", pronunciation: "Mizu", example: "毎日水を飲みます。" },
  ],
}

export async function GET(request: NextRequest, { params }: { params: { language: string } }) {
  try {
    const language = params.language as keyof typeof vocabularyData

    if (!vocabularyData[language]) {
      return NextResponse.json({ success: false, message: "Language not supported" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: vocabularyData[language],
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
  }
}
