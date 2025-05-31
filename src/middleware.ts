import { type NextRequest, NextResponse } from 'next/server';

import { checkSession } from 'features/auth';

export const middleware = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;
  const searchParams = request.nextUrl.searchParams;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);

  const session = await checkSession()
    .then(res => res)
    .catch(() => null);
  // 세션이 없는 경우
  if (!session) return NextResponse.redirect(new URL('/', request.url));

  // 세션이 있는데 인증 페이지로 접근하는 경우
  if (pathname === '/' || pathname.startsWith('/auth'))
    return NextResponse.redirect(new URL('/dashboard', request.url));

  const { role } = session.user;
  // 세션이 있고 교사가 아닌 경우
  if (
    role !== 'teacher' &&
    (['student-info', 'report'].some(path =>
      pathname.startsWith(`/dashboard/${path}`),
    ) ||
      pathname.endsWith('manage'))
  )
    return NextResponse.redirect(new URL('/dashboard', request.url));

  if (pathname === '/dashboard' && searchParams.size > 0) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
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
