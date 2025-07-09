import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'te'],
 
  // Used when no locale matches
  defaultLocale: 'en'
});
 
export const config = {
  // Match all pathnames except for
  // - The path for the favicon
  // - API routes
  // - Next.js internals
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};