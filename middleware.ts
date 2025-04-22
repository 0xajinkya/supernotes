import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {

  // const supabaseResponse = await updateSession(request)

  // const { nextUrl } = request;
  // const { pathname, search, hash } = nextUrl;

  // const host = request.headers.get('host');
  // console.log(host);

  // // Clone the original request headers
  // const modified_headers = new Headers(request.headers);

  // if (host) {
  //   // Transfer the origin header to the new headers object
  //   // e.g.: request.url = http://localhost:3004/v1/.api/...
  //   // new URL(request.url).protocol = "http:"
  //   modified_headers.set('origin', `${new URL(request.url).protocol}//${host}`);
  // }

  // if (host && pathname.startsWith('/.v1')) {
  //   const targetPath = pathname.replace(/^\/.v1/, '');
  //   const targetURL = `${process.env.NEXT_PUBLIC_API_DOMAIN}${targetPath}${search}${hash}`;
  //   console.log(targetURL);
  //   const myNewResponse = NextResponse.rewrite(targetURL, {
  //     request: {
  //       headers: modified_headers,
  //     },
  //   });
  //   supabaseResponse.cookies.getAll().forEach(({ name, value }) =>
  //     myNewResponse.cookies.set(name, value)
  //   );
  //   return myNewResponse;
  // };

  // const myNewResponse = NextResponse.next({ request })
  // supabaseResponse.cookies.getAll().forEach(({ name, value }) =>
  //   myNewResponse.cookies.set(name, value)
  // );
  // return myNewResponse;

  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}