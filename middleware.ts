import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Completely ignore internal Next.js fetches and static assets
  if (
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api') ||
    pathname.includes('.') // Ignores files like .jpg, .png, etc.
  ) {
    return NextResponse.next();
  }

  // 2. ONLY trigger Basic Auth if the user is explicitly on /admin
  if (pathname.startsWith('/admin')) {
    const authHeader = request.headers.get('authorization');

    if (!authHeader) {
      return new NextResponse('Authentication required', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Secure Admin Area"' },
      });
    }

    const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    const user = auth[0];
    const pass = auth[1];

    const ADMIN_USER = process.env.ADMIN_USERNAME || 'admin';
    const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'password123';

    if (user !== ADMIN_USER || pass !== ADMIN_PASS) {
      return new NextResponse('Invalid credentials', { status: 401 });
    }
  }

  return NextResponse.next();
}

// Stricter matcher to keep middleware away from your homebackground.png and other assets
export const config = {
  matcher: ['/admin/:path*', '/((?!_next/static|_next/image|favicon.ico|homebackground.png|home-crsl).*)'],
};