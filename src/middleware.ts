import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

export const middleware = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;
  const searchParams = request.nextUrl.searchParams;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);

  const cookieStore = await cookies();
  const sessionId = cookieStore.get('connect.sid')?.value ?? '';

  if (sessionId.length > 0) {
    try {
      const response = await fetch(
        'http://localhost:4000/api/v1/users/session-check',
        {
          headers: {
            Cookie: cookieStore.toString(),
          },
        },
      );

      const res = await response.json();
      console.log(res);
    } catch (error) {
      console.error(error instanceof Error ? error.message : String(error));
    }
  }

  if (pathname === '/dashboard' && sessionId.length === 0) {
    const cookieStore = await cookies();

    try {
      const response = await fetch(
        'http://localhost:4000/api/v1/users/csrf-token',
        {
          headers: {
            Cookie: cookieStore.toString(),
          },
        },
      );

      const { csrfToken } = await response.json();
      console.log(csrfToken);
    } catch (error) {
      console.error(error instanceof Error ? error.message : String(error));
    }
  }

  if (pathname === '/dashboard' && searchParams.size > 0) {
    return NextResponse.redirect(pathname);
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
};

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
  ],
};
