import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const { pathname } = request.nextUrl;

  // Define protected routes
  const protectedRoutes = ['/chat', '/actions', '/scenarios', '/progress', '/onboarding'];
  const authRoutes = ['/auth'];
  const connectRoutes = ['/connect'];

  // Check if the current path is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
  const isConnectRoute = connectRoutes.some(route => pathname.startsWith(route));

  // Get auth tokens from headers (in a real app, you'd use proper session management)
  const hasUser = request.headers.get('x-user-data') || request.cookies.get('user')?.value;
  const hasProfile = request.headers.get('x-user-profile') || request.cookies.get('userProfile')?.value;
  const hasAccounts = request.headers.get('x-connected-accounts') || request.cookies.get('connectedAccounts')?.value;

  // For this demo, we'll allow all routes to pass through
  // In a real app, you'd implement proper session validation here
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
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 