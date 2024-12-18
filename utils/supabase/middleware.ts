import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import {
  USER_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
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

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const isPublicRoutes = publicRoutes.includes(request.nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(request.nextUrl.pathname);
  const adminRoutes = request.nextUrl.pathname.startsWith("/admin");
  const manageAdminsRoute = request.nextUrl.pathname.startsWith(
    "/admin/manage-admins"
  );

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // Allow public routes for all users
  if (publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Restrict logged-in users from accessing auth routes
  if (user && authRoutes.includes(request.nextUrl.pathname)) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/";
    return NextResponse.redirect(redirectUrl);
  }

  // Restrict access to `/admin/*` for non-logged-in users
  if (!user && adminRoutes) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    return NextResponse.redirect(loginUrl);
  }

  // Restrict `/admin/*` to ADMIN and MASTER roles only
  if (user && adminRoutes) {
    const userRole = user?.user_metadata?.user_role;

    if (userRole === "USER") {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/";
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Restrict `/admin/manage-admins` to MASTER role only
  if (user && manageAdminsRoute) {
    const userRole = user?.user_metadata?.user_role;

    if (userRole !== "MASTER") {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/admin";
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Default to allow all other cases
  return NextResponse.next();

  // if (!user && !isPublicRoutes) {
  //   let callbackurl = request.nextUrl.pathname;
  //   if (request.nextUrl.search) {
  //     callbackurl += request.nextUrl.search;
  //   }

  //   const encodedCallbackUrl = encodeURIComponent(callbackurl);

  //   return Response.redirect(
  //     new URL(`/login?callbackUrl=${encodedCallbackUrl}`, request.nextUrl)
  //   );
  // }

  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
