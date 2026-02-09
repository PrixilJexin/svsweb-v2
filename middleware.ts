import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // 1. EXIT IMMEDIATELY if not an admin route
  // This ensures the home screen never triggers auth logic
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // 2. IGNORE BACKGROUND PRE-FETCHES (_rsc)
  // This is what stops the popup from showing during navigation
  if (searchParams.has('_rsc')) {
    return NextResponse.next();
  }

  // 3. AUTH LOGIC (Only runs for actual /admin visits)
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

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};