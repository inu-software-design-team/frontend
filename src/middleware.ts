import { type NextRequest, NextResponse } from 'next/server';

export const middleware = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;
  const searchParams = request.nextUrl.searchParams;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);

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
