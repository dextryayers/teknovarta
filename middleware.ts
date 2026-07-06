import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

const locales = ['en', 'id'];
const defaultLocale = 'id';

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage && acceptLanguage.includes('en')) {
    return 'en';
  }
  // Try to get from a cookie if implemented later
  const langCookie = request.cookies.get('NEXT_LOCALE')?.value;
  if (langCookie && locales.includes(langCookie)) return langCookie;
  
  return defaultLocale;
}

// --- ADVANCED FIREWALL CONFIGURATION ---

const MALICIOUS_PATTERNS = [
  // XSS & Script Injection
  /<script/i, /javascript:/i, /onerror/i, /onload/i, /alert\(/i, /<iframe/i, /<object/i, /eval\(/i, /setTimeout\(/i,
  // SQL Injection (More aggressive)
  /union select/i, /' OR '1'='1/i, /--/i, /drop table/i, /truncate table/i, /insert into/i, /sleep\(/i, /benchmark\(/i, /pg_sleep/i,
  // Path Traversal & File System
  /\.\.\//i, /\/etc\/passwd/i, /\/windows\/system32/i, /boot\.ini/i,
  // Code & Command Injection
  /phpinfo\(\)/i, /system\(/i, /exec\(/i, /passthru\(/i, /base64_decode/i,
  // NoSQL & GraphQL Injection
  /\{\$gt:/i, /\{\$ne:/i, /__schema/i, /introspection/i
];

// Simple In-Memory Rate Limiting (Note: Resets on server restart/deploy)
const RATE_LIMIT_MS = 60000; // 1 minute
const MAX_REQUESTS = 100;    // 100 requests per minute
const ipCache = new Map<string, { count: number; lastReset: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const userData = ipCache.get(ip) || { count: 0, lastReset: now };

  if (now - userData.lastReset > RATE_LIMIT_MS) {
    userData.count = 1;
    userData.lastReset = now;
    ipCache.set(ip, userData);
    return false;
  }

  userData.count++;
  ipCache.set(ip, userData);
  return userData.count > MAX_REQUESTS;
}

function isMalicious(value: string): boolean {
  return MALICIOUS_PATTERNS.some(pattern => pattern.test(value));
}

// --- MIDDLEWARE LOGIC ---

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const ip = request.ip || '127.0.0.1';

  // 1. Rate Limiting Check
  if (isRateLimited(ip)) {
    return new NextResponse('Rate Limit Exceeded. Too many requests.', { status: 429 });
  }

  // 2. FIREWALL: Attack Detection
  const decodedPath = decodeURIComponent(pathname);
  const decodedSearch = decodeURIComponent(search);

  if (isMalicious(decodedPath) || isMalicious(decodedSearch)) {
    console.error(`[FIREWALL BLOCK] Attack from ${ip} on ${pathname}`);
    
    // Log the attack asynchronously via background fetch to avoid blocking
    fetch(`${request.nextUrl.origin}/api/security/log`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventType: 'MALICIOUS_REQUEST',
        ipAddress: ip,
        details: `Blocked payload on ${pathname}${search}`
      })
    }).catch(() => {});

    return NextResponse.rewrite(new URL('/403', request.url), { status: 403 });
  }

  // 3. Security Headers
  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  response.headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:;");

  // 4. Auth Protection for /welcome
  if (pathname.startsWith('/welcome')) {
    const token = request.cookies.get('admin_token')?.value;
    
    if (!token) {
      return NextResponse.redirect(new URL('/login/admin', request.url));
    }
    
    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.redirect(new URL('/login/admin', request.url));
    }
  }

  // 5. i18n Language Routing
  // Skip public files, api routes, and Next.js internals
  if (
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api') || 
    pathname.includes('.')
  ) {
    return response;
  }

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    // Redirect if there is no locale
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
    
    // Create new redirect response but carry over the security headers from step 3
    const redirectResponse = NextResponse.redirect(request.nextUrl);
    redirectResponse.headers.set('X-Frame-Options', 'DENY');
    redirectResponse.headers.set('X-Content-Type-Options', 'nosniff');
    redirectResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    redirectResponse.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    
    return redirectResponse;
  }

  return response;
}

export const config = {
  matcher: [
    '/welcome/:path*', 
    '/login/admin',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
