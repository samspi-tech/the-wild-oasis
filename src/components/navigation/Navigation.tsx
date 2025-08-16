import Link from 'next/link';
import { navLinks } from './dataSource';

export default function Navigation() {
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
            </ul>
        </nav>
    );
}
