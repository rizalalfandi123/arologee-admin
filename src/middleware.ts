import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "./i18n-config";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

function getLocale(request: NextRequest): string | undefined {
   const negotiatorHeaders: Record<string, string> = {};

   request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

   // @ts-ignore locales are readonly
   const locales: string[] = i18n.locales;

   // Use negotiator and intl-localematcher to get best locale
   let languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales);

   const locale = matchLocale(languages, locales, i18n.defaultLocale);

   return locale;
}

const verifyUserAuth = async (request: NextRequest) => {
   const isAuth = request.cookies.has("auth");

   return isAuth;
};

export async function middleware(request: NextRequest) {
   const pathname = request.nextUrl.pathname;
   // const searchParams = request.nextUrl.searchParams;

   // console.log({pathname: request.nextUrl})

   const isAuth = await verifyUserAuth(request);

   if (!isAuth && !pathname.includes("/login")) {
      return NextResponse.redirect(new URL(`/login`, request.url));
   }

   // Check if there is any supported locale in the pathname
   const pathnameIsMissingLocale = i18n.locales.every((locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`);
   // Redirect if there is no locale
   if (pathnameIsMissingLocale) {
      const locale = getLocale(request);

      // const newUrl = new URL(
      //   `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
      //   request.url
      // );

      console.log({ r: request.nextUrl.toString() });

      request.nextUrl.pathname = `/${locale}` + request.nextUrl.pathname;

      // The new URL is now /en-US/products
      return NextResponse.redirect(request.nextUrl);
   }
}

export const config = {
   // Matcher ignoring `/_next/` and `/api/`
   matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico).*)"],
};
