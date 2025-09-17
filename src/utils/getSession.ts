import { auth } from '../lib/auth';

export async function getSession() {
    const session = await auth();
    if (!session) throw new Error('You must be logged in');

    return session;
}
