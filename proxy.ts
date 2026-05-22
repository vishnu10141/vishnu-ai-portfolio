import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const adminSession = request.cookies.get('admin_session')?.value;
  const path = request.nextUrl.pathname;
  
  // Protect /admin routes
  if (path.startsWith('/admin')) {
    if (!adminSession) {
      // Not logged in or no valid cookie
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Redirect /login to /admin if already logged in
  if (path === '/login') {
    if (adminSession) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
};
