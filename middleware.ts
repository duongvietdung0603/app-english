import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const locales = ["en", "vi", "ja"]
const defaultLocale = "vi"

function getLocale(request: NextRequest): string {
  // Check if locale is in URL
  const pathname = request.nextUrl.pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  )

  if (pathnameIsMissingLocale) {
    // Get locale from Accept-Language header or use default
    const acceptLanguage = request.headers.get("accept-language")
    let locale = defaultLocale

    if (acceptLanguage) {
      const preferredLocale = acceptLanguage.split(",")[0].split("-")[0].toLowerCase()

      if (locales.includes(preferredLocale)) {
        locale = preferredLocale
      }
    }

    return locale
  }

  return pathname.split("/")[1]
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip middleware for API routes, static files, and Next.js internals
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.includes(".") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next()
  }

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)

    // Handle root path
    if (pathname === "/") {
      return NextResponse.redirect(new URL(`/${locale}`, request.url))
    }

    // Handle other paths
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|api|favicon.ico).*)",
  ],
}
