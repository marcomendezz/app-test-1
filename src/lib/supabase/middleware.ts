import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    getEnvVar('NEXT_PUBLIC_SUPABASE_URL'),
    getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh session
  const { data: { user } } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // Default-deny: allowlist of routes that don't require authentication.
  // Any new route is protected by default unless explicitly listed here.
  const publicRoutes = [
    '/',
    '/login',
    '/signup',
    '/verify-email',
    '/confirmed',
    '/privacy',
    '/terms',
    '/auth/callback',
  ];

  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + '/')
  );

  const isAuthRoute = ['/login', '/signup', '/verify-email'].some(
    (route) => pathname === route
  );

  // Protected route: require authenticated + email-confirmed user
  if (!isPublicRoute) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    if (!user.email_confirmed_at) {
      const url = request.nextUrl.clone();
      url.pathname = '/verify-email';
      return NextResponse.redirect(url);
    }
  }

  // Redirect confirmed users away from auth routes to dashboard
  if (user && user.email_confirmed_at && isAuthRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
