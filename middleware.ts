import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ONLY run this logic if the path explicitly starts with /admin
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

  // For all other routes (like / or /gallery), just proceed normally
  return NextResponse.next();
}

// This config acts as a second layer of protection to keep middleware away from static files
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|homebackground.png|home-crsl).*)'],
};