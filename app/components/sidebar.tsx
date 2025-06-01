"use client"

import type React from "react"
import { HomeIcon, BookOpenIcon, TranslateIcon, CheckCircleIcon, UserIcon } from "@heroicons/react/24/outline"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useTranslation } from "@/app/contexts/language-context"
import { LanguageSwitcher } from "@/app/components/language-switcher"

interface SidebarProps {
  className?: string
}

interface SidebarItemProps {
  href: string
  icon: React.ReactNode
  label: string
}

const SidebarItem = ({ href, icon, label }: SidebarItemProps) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <li>
      <Link
        href={href}
        className={cn(
          "flex items-center space-x-2 rounded-md p-2 hover:bg-gray-100",
          isActive && "bg-gray-100 font-semibold",
        )}
      >
        {icon}
        <span>{label}</span>
      </Link>
    </li>
  )
}

const SidebarFooter = ({ children }: { children: React.ReactNode }) => {
  return <div className="mt-auto border-t border-gray-200 p-4">{children}</div>
}

const Sidebar = ({ className }: SidebarProps) => {
  const { t } = useTranslation()

  const sidebarItems = [
    { href: "/", icon: <HomeIcon className="h-5 w-5" />, label: t("nav.dashboard") },
    {
      href: "/vocabulary",
      icon: <BookOpenIcon className="h-5 w-5" />,
      label: t("nav.vocabulary"),
    },
    {
      href: "/translation",
      icon: <TranslateIcon className="h-5 w-5" />,
      label: t("nav.translation"),
    },
    {
      href: "/practice",
      icon: <CheckCircleIcon className="h-5 w-5" />,
      label: t("nav.practice"),
    },
    {
      href: "/profile",
      icon: <UserIcon className="h-5 w-5" />,
      label: t("nav.profile"),
    },
  ]

  return (
    <div className={cn("flex h-full w-64 flex-col border-r border-gray-200 bg-white", className)}>
      <div className="p-4">
        <h1 className="text-2xl font-bold">LinguaLearn</h1>
      </div>
      <ul className="flex-1 space-y-1 p-4">
        {sidebarItems.map((item) => (
          <SidebarItem key={item.href} href={item.href} icon={item.icon} label={item.label} />
        ))}
      </ul>
      <SidebarFooter>
        <div className="flex items-center justify-between p-2">
          <LanguageSwitcher />
        </div>
      </SidebarFooter>
    </div>
  )
}

export default Sidebar
