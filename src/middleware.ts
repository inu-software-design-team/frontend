import { type NextRequest, NextResponse } from 'next/server';

export const middleware = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;
  const searchParams = request.nextUrl.searchParams;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);

  const authQuery = searchParams.get('auth');
  const isLogin = authQuery && authQuery === 'success';
  const isMain = !['/start', '/signup'].includes(pathname);

  // 로그인 & 회원가입 API 연동 전 임시 설정
  if (!isLogin && isMain)
    return NextResponse.redirect(new URL('/start', request.url));

  if (isLogin && !isMain)
    return NextResponse.redirect(new URL('/?auth=success', request.url));

  if (isMain) searchParams.set('auth', 'success');
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
