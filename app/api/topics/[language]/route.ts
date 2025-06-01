import { type NextRequest, NextResponse } from "next/server"

const topicsData = {
  english: [
    {
      id: 1,
      title: "Daily Routine",
      description: "Learn vocabulary and phrases about daily activities",
      icon: "🌅",
      level: "Beginner",
      lessonsCount: 12,
      vocabularyCount: 45,
      color: "blue",
      estimatedTime: "2 hours",
      topics: ["Morning routine", "Work activities", "Evening activities"],
    },
    {
      id: 2,
      title: "Family & Relationships",
      description: "Vocabulary about family members and relationships",
      icon: "👨‍👩‍👧‍👦",
      level: "Beginner",
      lessonsCount: 8,
      vocabularyCount: 32,
      color: "emerald",
      estimatedTime: "1.5 hours",
      topics: ["Family members", "Relationships", "Describing people"],
    },
    {
      id: 3,
      title: "Food & Cooking",
      description: "Learn about food, cooking, and dining vocabulary",
      icon: "🍳",
      level: "Intermediate",
      lessonsCount: 15,
      vocabularyCount: 68,
      color: "orange",
      estimatedTime: "3 hours",
      topics: ["Ingredients", "Cooking methods", "Restaurant dining"],
    },
    {
      id: 4,
      title: "Travel & Transportation",
      description: "Essential vocabulary for traveling and getting around",
      icon: "✈️",
      level: "Intermediate",
      lessonsCount: 10,
      vocabularyCount: 55,
      color: "purple",
      estimatedTime: "2.5 hours",
      topics: ["Transportation", "Hotel booking", "Directions"],
    },
    {
      id: 5,
      title: "Work & Business",
      description: "Professional vocabulary and business communication",
      icon: "💼",
      level: "Advanced",
      lessonsCount: 18,
      vocabularyCount: 89,
      color: "slate",
      estimatedTime: "4 hours",
      topics: ["Office environment", "Meetings", "Email communication"],
    },
    {
      id: 6,
      title: "Health & Medicine",
      description: "Medical vocabulary and health-related conversations",
      icon: "🏥",
      level: "Intermediate",
      lessonsCount: 12,
      vocabularyCount: 76,
      color: "red",
      estimatedTime: "3 hours",
      topics: ["Body parts", "Symptoms", "Medical appointments"],
    },
    {
      id: 7,
      title: "Shopping & Money",
      description: "Learn about shopping, prices, and financial vocabulary",
      icon: "🛒",
      level: "Beginner",
      lessonsCount: 9,
      vocabularyCount: 41,
      color: "green",
      estimatedTime: "2 hours",
      topics: ["Shopping phrases", "Money & prices", "Payment methods"],
    },
    {
      id: 8,
      title: "Weather & Seasons",
      description: "Vocabulary about weather conditions and seasons",
      icon: "🌤️",
      level: "Beginner",
      lessonsCount: 6,
      vocabularyCount: 28,
      color: "cyan",
      estimatedTime: "1 hour",
      topics: ["Weather conditions", "Seasons", "Climate"],
    },
  ],
  japanese: [
    {
      id: 1,
      title: "日常生活 (Daily Life)",
      description: "Learn vocabulary and phrases about daily activities",
      icon: "🌅",
      level: "Beginner",
      lessonsCount: 12,
      vocabularyCount: 45,
      color: "blue",
      estimatedTime: "2 hours",
      topics: ["朝の習慣", "仕事の活動", "夜の活動"],
    },
    {
      id: 2,
      title: "家族 (Family)",
      description: "Vocabulary about family members and relationships",
      icon: "👨‍👩‍👧‍👦",
      level: "Beginner",
      lessonsCount: 8,
      vocabularyCount: 32,
      color: "emerald",
      estimatedTime: "1.5 hours",
      topics: ["家族のメンバー", "関係", "人の説明"],
    },
    {
      id: 3,
      title: "食べ物 (Food)",
      description: "Learn about food, cooking, and dining vocabulary",
      icon: "🍳",
      level: "Intermediate",
      lessonsCount: 15,
      vocabularyCount: 68,
      color: "orange",
      estimatedTime: "3 hours",
      topics: ["材料", "料理方法", "レストラン"],
    },
    {
      id: 4,
      title: "旅行 (Travel)",
      description: "Essential vocabulary for traveling and getting around",
      icon: "✈️",
      level: "Intermediate",
      lessonsCount: 10,
      vocabularyCount: 55,
      color: "purple",
      estimatedTime: "2.5 hours",
      topics: ["交通手段", "ホテル予約", "道案内"],
    },
  ],
}

export async function GET(request: NextRequest, { params }: { params: { language: string } }) {
  try {
    const language = params.language as keyof typeof topicsData

    if (!topicsData[language]) {
      return NextResponse.json({ success: false, message: "Language not supported" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: topicsData[language],
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
  }
}
