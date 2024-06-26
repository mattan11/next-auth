import { auth } from '@/lib/auth';

export default auth(req => {
  const isLoggedIn = !!req.auth;
  const route = req.nextUrl.pathname;
  // req.auth
});

// where to invoke the middleware
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
