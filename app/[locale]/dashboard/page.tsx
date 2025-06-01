"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, FileText, MessageSquare, LogOut, Globe, TrendingUp, Target, Clock } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useTranslation, useLanguage } from "@/app/contexts/language-context"
import { LanguageSwitcher } from "@/app/components/language-switcher"

export default function DashboardPage() {
  const router = useRouter()
  const { t } = useTranslation()
  const { language } = useLanguage()
  const [user, setUser] = useState<{ name: string; email: string; preferredLanguage: string; avatar: string } | null>(
    null,
  )

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push(`/${language}/auth/login`)
    }
  }, [router, language])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push(`/${language}`)
  }

  const getLanguageInfo = () => {
    if (!user) return null

    if (user.preferredLanguage === "english") {
      return {
        name: "English",
        flag: "🇺🇸",
        color: "emerald",
        greeting: t("dashboard.welcome"),
        description: t("dashboard.english_learning_description"),
      }
    } else if (user.preferredLanguage === "japanese") {
      return {
        name: "Japanese",
        flag: "🇯🇵",
        color: "emerald",
        greeting: "おかえりなさい！",
        description: "日本語の勉強を続けましょう",
      }
    } else {
      return {
        name: "Multi-language",
        flag: "🌍",
        color: "emerald",
        greeting: t("dashboard.welcome"),
        description: t("dashboard.choose_language_description"),
      }
    }
  }

  const languageInfo = getLanguageInfo()

  if (!user || !languageInfo) return null

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Professional Header */}
      <header className="bg-slate-800/90 backdrop-blur-sm border-b border-slate-700/50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <Globe className="h-4 w-4 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-slate-100">LinguaLearn</h1>
              <p className="text-xs text-slate-400">{t("homepage.platform_subtitle")}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <div className="flex items-center space-x-3">
              <span className="text-xl">{user.avatar}</span>
              <div className="text-right">
                <div className="text-sm font-medium text-slate-200">{user.name}</div>
                <div className="text-xs text-slate-400">{user.email}</div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-slate-400 hover:text-slate-100 hover:bg-slate-700/50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              {t("auth.logout")}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-4xl">{languageInfo.flag}</span>
            <div>
              <h2 className="text-2xl font-bold text-slate-100">{languageInfo.greeting}</h2>
              <p className="text-slate-400">{languageInfo.description}</p>
            </div>
          </div>
        </div>

        {/* Learning Activities */}
        {user.preferredLanguage !== "both" ? (
          // Single Language Layout
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-6 text-slate-200">{t("dashboard.learning_activities")}</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href={`/${language}/learn/${user.preferredLanguage}/vocabulary`}>
                <Card className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/70 transition-all cursor-pointer h-full">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg text-slate-100">{t("dashboard.vocabulary_learning")}</CardTitle>
                    <CardDescription className="text-slate-400">
                      {t("dashboard.vocabulary_description")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">127</div>
                      <p className="text-sm text-slate-400">{t("dashboard.words_learned")}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href={`/${language}/practice/${user.preferredLanguage}/sentence-translation`}>
                <Card className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/70 transition-all cursor-pointer h-full">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg text-slate-100">{t("dashboard.sentence_translation")}</CardTitle>
                    <CardDescription className="text-slate-400">{t("dashboard.sentence_description")}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-400">45</div>
                      <p className="text-sm text-slate-400">{t("dashboard.sentences_today")}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href={`/${language}/practice/${user.preferredLanguage}/paragraph-translation`}>
                <Card className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/70 transition-all cursor-pointer h-full">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg text-slate-100">{t("dashboard.paragraph_translation")}</CardTitle>
                    <CardDescription className="text-slate-400">{t("dashboard.paragraph_description")}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">12</div>
                      <p className="text-sm text-slate-400">{t("dashboard.paragraphs_completed")}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        ) : (
          // Multi Language Layout for Admin
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-6 text-slate-200">{t("dashboard.choose_your_language")}</h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/70 transition-all cursor-pointer">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-4">🇺🇸</div>
                  <CardTitle className="text-xl text-slate-100">English</CardTitle>
                  <CardDescription className="text-slate-400">English Learning Path</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href={`/${language}/learn/english/vocabulary`} className="block">
                    <Button
                      variant="outline"
                      className="w-full justify-start border-slate-600 text-slate-300 hover:bg-slate-700/50"
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      {t("dashboard.vocabulary_learning")}
                    </Button>
                  </Link>
                  <Link href={`/${language}/practice/english/sentence-translation`} className="block">
                    <Button
                      variant="outline"
                      className="w-full justify-start border-slate-600 text-slate-300 hover:bg-slate-700/50"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      {t("dashboard.sentence_translation")}
                    </Button>
                  </Link>
                  <Link href={`/${language}/practice/english/paragraph-translation`} className="block">
                    <Button
                      variant="outline"
                      className="w-full justify-start border-slate-600 text-slate-300 hover:bg-slate-700/50"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      {t("dashboard.paragraph_translation")}
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/70 transition-all cursor-pointer">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-4">🇯🇵</div>
                  <CardTitle className="text-xl text-slate-100">Japanese</CardTitle>
                  <CardDescription className="text-slate-400">Japanese Learning Path</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href={`/${language}/learn/japanese/vocabulary`} className="block">
                    <Button
                      variant="outline"
                      className="w-full justify-start border-slate-600 text-slate-300 hover:bg-slate-700/50"
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      {t("dashboard.vocabulary_learning")}
                    </Button>
                  </Link>
                  <Link href={`/${language}/practice/japanese/sentence-translation`} className="block">
                    <Button
                      variant="outline"
                      className="w-full justify-start border-slate-600 text-slate-300 hover:bg-slate-700/50"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      {t("dashboard.sentence_translation")}
                    </Button>
                  </Link>
                  <Link href={`/${language}/practice/japanese/paragraph-translation`} className="block">
                    <Button
                      variant="outline"
                      className="w-full justify-start border-slate-600 text-slate-300 hover:bg-slate-700/50"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      {t("dashboard.paragraph_translation")}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Progress Overview */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-6 text-slate-200">{t("dashboard.progress_overview")}</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">{t("dashboard.current_streak")}</CardTitle>
                <TrendingUp className="h-4 w-4 text-orange-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-400">7 days</div>
                <p className="text-xs text-slate-400">{t("dashboard.keep_it_up")}</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">{t("dashboard.accuracy")}</CardTitle>
                <Target className="h-4 w-4 text-emerald-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-400">85%</div>
                <p className="text-xs text-slate-400">{t("dashboard.this_week")}</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">{t("dashboard.study_time")}</CardTitle>
                <Clock className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-400">2.5h</div>
                <p className="text-xs text-slate-400">{t("dashboard.today")}</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">{t("dashboard.level")}</CardTitle>
                <Globe className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-400">Level 5</div>
                <p className="text-xs text-slate-400">Intermediate</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="text-xl font-semibold mb-6 text-slate-200">{t("dashboard.recent_activity")}</h3>
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-200">Completed vocabulary lesson "Family"</p>
                    <p className="text-xs text-slate-400">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-200">Successfully translated 15 sentences in a row</p>
                    <p className="text-xs text-slate-400">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-200">Achieved 7-day streak</p>
                    <p className="text-xs text-slate-400">Yesterday</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
