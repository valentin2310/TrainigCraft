import { NextResponse } from "next/server";
import { authMiddleware, redirectToHome, redirectToLogin } from "next-firebase-auth-edge";
import { authConfig } from "@/firebase/server-config";

const PUBLIC_PATHS = ['/'];

export async function middleware(request) {
    return authMiddleware(request, {
        loginPath: "/api/login",
        logoutPath: "/api/logout",
        apiKey: authConfig.apiKey,
        cookieName: authConfig.cookieName,
        cookieSignatureKeys: authConfig.cookieSignatureKeys,
        cookieSerializeOptions: authConfig.cookieSerializeOptions,
        serviceAccount: authConfig.serviceAccount,
        handleValidToken: async ({ token, decodedToken }, headers) => {
            // Authenticated user should not be able to access /login, /register and /reset-password routes
            /*  if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
               return redirectToHome(request);
             } */

            return NextResponse.next({
                request: {
                    headers
                }
            });
        },
        handleInvalidToken: async (reason) => {
            console.info('Missing or malformed credentials', { reason });

            return redirectToLogin(request, {
                path: '/',
                publicPaths: PUBLIC_PATHS
            });
        },
        handleError: async (error) => {
            console.error('Unhandled authentication error', { error });

            return redirectToLogin(request, {
                path: '/',
                publicPaths: PUBLIC_PATHS
            });
        }
    });
}

export const config = {
    matcher: [
        "/((?!_next|api|.*\\.).*)",
        "/api/login",
        "/api/logout",
        "/dashboard",
        '/sesiones',
        "/dashboard/:path*"
    ],
};