import Google from 'next-auth/providers/google';
import NextAuth, { type User, type Session } from 'next-auth';
import { createGuest, getGuest } from './supabase/dataService/guest.service';

type GuestUser = User & { guestId?: number | undefined };

type GuestSession = {
    session: {
        user?: GuestUser | undefined;
        expires: string;
    };
};

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
        signIn: async ({ user }: { user: User }) => {
            try {
                const { email, name: fullName } = user;
                const existingGuest = await getGuest(email);

                if (!existingGuest) await createGuest({ email, fullName });

                return true;
            } catch (error) {
                return false;
            }
        },
        session: async ({ session }: GuestSession) => {
            const email = session?.user?.email;
            const guest = await getGuest(email);

            session!.user!.guestId = guest?.id;

            return session;
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
