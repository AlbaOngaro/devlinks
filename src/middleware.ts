import { supabase } from "lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const refreshToken = req.cookies.get("dl-refresh-token")?.value;
  const accessToken = req.cookies.get("dl-access-token")?.value;

  if (!refreshToken || !accessToken) {
    if (!["/login", "/register"].some((path) => req.url.endsWith(path))) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return;
  }

  await supabase.auth.setSession({
    refresh_token: refreshToken,
    access_token: accessToken,
  });

  const { error } = await supabase.auth.getUser();

  if (
    !error &&
    ["/login", "/register"].some((path) => req.url.endsWith(path))
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};
