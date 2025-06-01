import { type NextRequest, NextResponse } from "next/server"

const sentenceTopicsData = {
  english: [
    {
      id: 1,
      title: "Daily Conversations",
      description: "Practice everyday conversation sentences",
      icon: "💬",
      level: "Beginner",
      sentencesCount: 25,
      difficulty: "Easy",
      color: "blue",
      estimatedTime: "30 minutes",
      topics: ["Greetings", "Small talk", "Basic questions"],
    },
    {
      id: 2,
      title: "Family & Friends",
      description: "Sentences about relationships and family",
      icon: "👨‍👩‍👧‍👦",
      level: "Beginner",
      sentencesCount: 20,
      difficulty: "Easy",
      color: "emerald",
      estimatedTime: "25 minutes",
      topics: ["Family members", "Describing people", "Relationships"],
    },
    {
      id: 3,
      title: "Food & Dining",
      description: "Restaurant and cooking related sentences",
      icon: "🍽️",
      level: "Intermediate",
      sentencesCount: 30,
      difficulty: "Medium",
      color: "orange",
      estimatedTime: "45 minutes",
      topics: ["Ordering food", "Cooking instructions", "Food preferences"],
    },
    {
      id: 4,
      title: "Travel & Transportation",
      description: "Sentences for traveling and getting around",
      icon: "🚗",
      level: "Intermediate",
      sentencesCount: 28,
      difficulty: "Medium",
      color: "purple",
      estimatedTime: "40 minutes",
      topics: ["Directions", "Transportation", "Hotel booking"],
    },
    {
      id: 5,
      title: "Business & Work",
      description: "Professional communication sentences",
      icon: "💼",
      level: "Advanced",
      sentencesCount: 35,
      difficulty: "Hard",
      color: "slate",
      estimatedTime: "60 minutes",
      topics: ["Meetings", "Email phrases", "Presentations"],
    },
    {
      id: 6,
      title: "Shopping & Money",
      description: "Sentences about shopping and financial transactions",
      icon: "🛍️",
      level: "Beginner",
      sentencesCount: 22,
      difficulty: "Easy",
      color: "green",
      estimatedTime: "30 minutes",
      topics: ["Prices", "Payment", "Shopping phrases"],
    },
    {
      id: 7,
      title: "Health & Medicine",
      description: "Medical and health-related sentences",
      icon: "🏥",
      level: "Intermediate",
      sentencesCount: 26,
      difficulty: "Medium",
      color: "red",
      estimatedTime: "35 minutes",
      topics: ["Symptoms", "Doctor visits", "Medicine"],
    },
    {
      id: 8,
      title: "Technology & Internet",
      description: "Modern technology and internet sentences",
      icon: "💻",
      level: "Advanced",
      sentencesCount: 32,
      difficulty: "Hard",
      color: "cyan",
      estimatedTime: "50 minutes",
      topics: ["Social media", "Computers", "Online services"],
    },
  ],
  japanese: [
    {
      id: 1,
      title: "日常会話 (Daily Conversations)",
      description: "Practice everyday conversation sentences",
      icon: "💬",
      level: "Beginner",
      sentencesCount: 25,
      difficulty: "Easy",
      color: "blue",
      estimatedTime: "30 minutes",
      topics: ["挨拶", "日常の話", "基本的な質問"],
    },
    {
      id: 2,
      title: "家族 (Family)",
      description: "Sentences about family and relationships",
      icon: "👨‍👩‍👧‍👦",
      level: "Beginner",
      sentencesCount: 20,
      difficulty: "Easy",
      color: "emerald",
      estimatedTime: "25 minutes",
      topics: ["家族のメンバー", "人の説明", "関係"],
    },
    {
      id: 3,
      title: "食べ物 (Food)",
      description: "Restaurant and cooking related sentences",
      icon: "🍽️",
      level: "Intermediate",
      sentencesCount: 30,
      difficulty: "Medium",
      color: "orange",
      estimatedTime: "45 minutes",
      topics: ["注文", "料理の説明", "食べ物の好み"],
    },
    {
      id: 4,
      title: "旅行 (Travel)",
      description: "Sentences for traveling and transportation",
      icon: "🚗",
      level: "Intermediate",
      sentencesCount: 28,
      difficulty: "Medium",
      color: "purple",
      estimatedTime: "40 minutes",
      topics: ["道案内", "交通手段", "ホテル予約"],
    },
  ],
}

export async function GET(request: NextRequest, { params }: { params: { language: string } }) {
  try {
    const language = params.language as keyof typeof sentenceTopicsData

    if (!sentenceTopicsData[language]) {
      return NextResponse.json({ success: false, message: "Language not supported" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: sentenceTopicsData[language],
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
  }
}
