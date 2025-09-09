import NextAuth, {
    type User,
    type Session,
    type DefaultSession,
} from 'next-auth';
import Google from 'next-auth/providers/google';
import { createGuest, getGuest } from './supabase/dataService/guest.service';

declare module 'next-auth' {
    interface Session {
        user: {
            guestId: number | undefined;
        } & DefaultSession['user'];
    }
}

type Auth = {
    auth: Session | null;
};

type GuestUser = {
    user: User;
};

type GuestSession = {
    session: Session;
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
        signIn: async ({ user }: GuestUser) => {
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

            session!.user.guestId = guest?.id;

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
