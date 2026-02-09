import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // STRICT CHECK: Only trigger if the path starts with /admin 
  // AND it is not a Next.js internal data request (_rsc)
  if (pathname.startsWith('/admin') && !request.nextUrl.searchParams.has('_rsc')) {
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

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - All images in public folder (png, jpg, jpeg, gif, svg)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};