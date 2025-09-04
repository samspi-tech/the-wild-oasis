import Link from 'next/link';
import { auth } from '@/src/lib/auth';
import { navLinks } from './dataSource';

export default async function Navigation() {
    const session = await auth();

    return (
        <nav className="z-10 self-center text-xl">
            <ul className="flex items-center gap-16 max-[375px]:gap-10 max-[320px]:gap-5">
                {navLinks.map((link) => {
                    const { id, name, href } = link;

                    return (
                        <li key={id}>
                            <Link
                                href={href}
                                className="transition-colors hover:text-accent-400"
                            >
                                {name}
                            </Link>
                        </li>
                    );
                })}
                {session?.user ? (
                    <Link
                        href="/account"
                        className="flex items-center gap-4 transition-colors hover:text-accent-400"
                    >
                        <img
                            alt={session.user.name!}
                            src={session.user.image!}
                            className="h-8 rounded-full"
                            referrerPolicy="no-referrer"
                        />
                        <span>{session.user.name}</span>
                    </Link>
                ) : (
                    <Link
                        href="/account"
                        className="transition-colors hover:text-accent-400"
                    >
                        Guest area
                    </Link>
                )}
            </ul>
        </nav>
    );
}
