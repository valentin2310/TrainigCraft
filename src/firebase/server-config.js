export const serverConfig = {
    useSecureCookies: process.env.USE_SECURE_COOKIES === "true",
    firebaseApiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    serviceAccount: {
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }
};

export const authConfig = {
    apiKey: serverConfig.firebaseApiKey,
    cookieName: process.env.AUTH_COOKIE_NAME,
    cookieSignatureKeys: [process.env.AUTH_COOKIE_SIGNATURE_KEY_CURRENT, process.env.AUTH_COOKIE_SIGNATURE_KEY_PREVIOUS],
    cookieSerializeOptions: {
        path: "/",
        httpOnly: true,
        secure: serverConfig.useSecureCookies, // Set this to true on HTTPS environments
        sameSite: "lax",
        maxAge: 12 * 60 * 60 * 24, // twelve days
    },
    serviceAccount: serverConfig.serviceAccount,
};