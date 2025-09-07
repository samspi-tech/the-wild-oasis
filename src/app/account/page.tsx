import { auth } from '@/src/lib/auth';

export const metadata = {
    title: 'Guest area',
};

export default async function Page() {
    const session = await auth();
    const firstName = session?.user?.name?.split(' ').at(0);

    return (
        <section>
            <h2 className="mb-7 text-2xl font-semibold text-accent-400">
                Welcome, {firstName}
            </h2>
        </section>
    );
}
