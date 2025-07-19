import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "./stack";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Define protected routes
    const protectedRoutes = [
        "/dashboard",
        "/workflows/create",
        "/workflows/edit",
        "/profile",
    ];

    // Check if the current path is protected
    const isProtectedRoute = protectedRoutes.some(route =>
        pathname.startsWith(route)
    );

    if (isProtectedRoute) {
        try {
            // Get the user from the server app
            const user = await stackServerApp.getUser();

            if (!user) {
                // Redirect to sign in if user is not authenticated
                const signInUrl = new URL("/handler/sign-in", request.url);
                signInUrl.searchParams.set("after_auth_return_to", pathname);
                return NextResponse.redirect(signInUrl);
            }
        } catch (error) {
            // If there's an error getting the user, redirect to sign in
            const signInUrl = new URL("/handler/sign-in", request.url);
            signInUrl.searchParams.set("after_auth_return_to", pathname);
            return NextResponse.redirect(signInUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - handler (StackAuth handler routes)
         */
        "/((?!api|_next/static|_next/image|favicon.ico|handler).*)",
    ],
};