import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Middleware to check authentication status and protect routes
 * 检查认证状态并保护路由的中间件
 */
export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // Get pathname from request
  // 从请求中获取路径
  const { pathname } = request.nextUrl

  // Allow access to login page and API routes
  // 允许访问登录页面和 API 路由
  if (pathname.startsWith('/login') || pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  // Redirect to login if no token is found
  // 如果没有令牌，重定向到登录页面
  if (!token) {
    const url = new URL('/login', request.url)
    url.searchParams.set('callbackUrl', encodeURI(pathname))
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

// Configure which routes to run middleware on
// 配置在哪些路由上运行中间件
export const config = {
  matcher: [
    /*
     * Match all routes except:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /static (static files)
     * 4. /login (login page)
     */
    '/((?!api|_next|static|login|favicon.ico).*)',
  ],
} 