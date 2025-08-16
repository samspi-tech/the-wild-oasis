import Link from 'next/link';
import { navLinks } from './dataSource';
import SignOutButton from '@/src/components/SignOutButton';

export default function SideNavigation() {
    return (
        <nav className="border-r border-primary-900">
            <ul className="flex h-full flex-col gap-2 text-lg">
                {navLinks.map((link) => {
                    const { id, name, href, icon } = link;
                    const Icon = icon;

                    return (
                        <li key={id}>
                            <Link
                                className={`flex items-center gap-4 px-5 py-3 font-semibold text-primary-200 transition-colors hover:bg-primary-900 hover:text-primary-100`}
                                href={href}
                            >
                                <Icon className="h-5 w-5 text-primary-600" />
                                <span>{name}</span>
                            </Link>
                        </li>
                    );
                })}
                <li className="mt-auto">
                    <SignOutButton />
                </li>
            </ul>
        </nav>
    );
}
