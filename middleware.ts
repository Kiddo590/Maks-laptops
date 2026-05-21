import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value
  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }
}

export const config = {
  matcher: ['/admin/dashboard/:path*'],
}
