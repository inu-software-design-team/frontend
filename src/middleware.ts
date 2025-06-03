import { type NextRequest, NextResponse } from 'next/server';

import { checkSession } from 'features/auth';

export const middleware = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;
  const searchParams = request.nextUrl.searchParams;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);
  const cookies = request.cookies;

  const session = cookies.get('connect.sid')?.value ?? '';
  // 세션이 없는 경우
  if (session.length === 0) {
    if (!(pathname === '/' || pathname.startsWith('/auth')))
      return NextResponse.redirect(new URL('/', request.url));
  } else {
    // 세션이 있는데 인증 페이지로 접근하는 경우
    if (pathname === '/' || pathname.startsWith('/auth'))
      return NextResponse.redirect(new URL('/dashboard', request.url));

    const { role } = (await checkSession()).user;
    // 세션이 있고 교사가 아닌 경우
    if (
      role !== 'teacher' &&
      (['student-info', 'report'].some(path =>
        pathname.startsWith(`/dashboard/${path}`),
      ) ||
        pathname.endsWith('manage'))
    )
      return NextResponse.redirect(new URL('/dashboard', request.url));

    const sortKeyParam = searchParams.get('sortKey') ?? '';
    const sortValueParam = searchParams.get('sortValue') ?? '';

    // 카테고리 페이지에서 정렬 파라미터(sortKey & sortValue)가 하나라도 없는 경우
    if (
      pathname !== '/dashboard' &&
      (sortKeyParam.length === 0 || sortValueParam.length === 0)
    ) {
      const url = new URL(request.url);
      url.searchParams.set(
        'sortKey',
        sortKeyParam.length === 0 ? 'studentId' : sortKeyParam,
      );
      url.searchParams.set(
        'sortValue',
        sortValueParam.length === 0 ? 'asc' : sortValueParam,
      );

      return NextResponse.redirect(url);
    }

    // 카테고리 페이지에서 날짜 파라미터가 없는 경우
    if (
      pathname !== '/dashboard' &&
      !pathname.endsWith('manage') &&
      (searchParams.get('date') ?? '').length === 0
    ) {
      const url = new URL(request.url);
      url.searchParams.set('date', 'desc');

      return NextResponse.redirect(url);
    }

    // 홈 페이지에 쿼리 파라미터가 존재할 경우
    if (pathname === '/dashboard' && searchParams.size > 0) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
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
