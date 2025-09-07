import Google from 'next-auth/providers/google';
import NextAuth, { type Session } from 'next-auth';

type Auth = {
    auth: Session | null;
};

const authConfig = {
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
    ],
    callbacks: {
        authorized: async ({ auth }: Auth) => {
            return !!auth;
        },
    },
    pages: {
        signIn: '/login',
    },
};

export const {
    auth,
    signIn,
    signOut,
    handlers: { GET, POST },
} = NextAuth(authConfig);
