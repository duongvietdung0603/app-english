import { type NextRequest, NextResponse } from "next/server"

const paragraphData = {
  english: {
    title: "My Daily Routine",
    sentences: [
      {
        id: 1,
        vietnamese: "Tôi thức dậy lúc 6 giờ sáng.",
        correct: "I wake up at 6 AM.",
        hints: ["'thức dậy' là 'wake up'", "Sử dụng 'at' cho thời gian cụ thể"],
      },
      {
        id: 2,
        vietnamese: "Sau đó tôi đánh răng và rửa mặt.",
        correct: "Then I brush my teeth and wash my face.",
        hints: ["'đánh răng' là 'brush teeth'", "'rửa mặt' là 'wash face'"],
      },
      {
        id: 3,
        vietnamese: "Tôi ăn sáng với gia đình.",
        correct: "I have breakfast with my family.",
        hints: ["'ăn sáng' là 'have breakfast'", "'với' là 'with'"],
      },
      {
        id: 4,
        vietnamese: "Sau đó tôi đi làm bằng xe buýt.",
        correct: "Then I go to work by bus.",
        hints: ["'đi làm' là 'go to work'", "'bằng xe buýt' là 'by bus'"],
      },
      {
        id: 5,
        vietnamese: "Tôi làm việc từ 8 giờ sáng đến 5 giờ chiều.",
        correct: "I work from 8 AM to 5 PM.",
        hints: ["'làm việc' là 'work'", "'từ...đến' là 'from...to'"],
      },
      {
        id: 6,
        vietnamese: "Cuối cùng, tôi về nhà và nghỉ ngơi.",
        correct: "Finally, I go home and rest.",
        hints: ["'cuối cùng' là 'finally'", "'nghỉ ngơi' là 'rest'"],
      },
    ],
  },
  japanese: {
    title: "私の一日",
    sentences: [
      {
        id: 1,
        vietnamese: "Tôi thức dậy lúc 6 giờ sáng.",
        correct: "私は朝6時に起きます。",
        hints: ["私 (watashi) = tôi", "起きます (okimasu) = thức dậy"],
      },
      {
        id: 2,
        vietnamese: "Sau đó tôi đánh răng và rửa mặt.",
        correct: "それから歯を磨いて、顔を洗います。",
        hints: ["それから = sau đó", "歯を磨く = đánh răng"],
      },
      {
        id: 3,
        vietnamese: "Tôi ăn sáng với gia đình.",
        correct: "家族と朝ごはんを食べます。",
        hints: ["家族 (kazoku) = gia đình", "朝ごはん = bữa sáng"],
      },
      {
        id: 4,
        vietnamese: "Sau đó tôi đi làm bằng xe buýt.",
        correct: "それからバスで会社に行きます。",
        hints: ["バス = xe buýt", "会社 (kaisha) = công ty"],
      },
      {
        id: 5,
        vietnamese: "Tôi làm việc từ 8 giờ sáng đến 5 giờ chiều.",
        correct: "私は朝8時から夕方5時まで働きます。",
        hints: ["働きます (hatarakimasu) = làm việc", "から...まで = từ...đến"],
      },
      {
        id: 6,
        vietnamese: "Cuối cùng, tôi về nhà và nghỉ ngơi.",
        correct: "最後に、家に帰って休みます。",
        hints: ["最後に (saigo ni) = cuối cùng", "休みます (yasumimasu) = nghỉ ngơi"],
      },
    ],
  },
}

export async function GET(request: NextRequest, { params }: { params: { language: string } }) {
  try {
    const language = params.language as keyof typeof paragraphData

    if (!paragraphData[language]) {
      return NextResponse.json({ success: false, message: "Language not supported" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: paragraphData[language],
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
  }
}
