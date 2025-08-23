'use client';

import Link from 'next/link';
import { navLinks } from './dataSource';
import { usePathname } from 'next/navigation';
import SignOutButton from '@/src/components/UI/SignOutButton';

export type SideNavProps = {
    isVisible: boolean;
    onToggle: () => void;
};

export default function SideNavigation({ onToggle, isVisible }: SideNavProps) {
    const pathname = usePathname();

    return (
        <nav
            className={`${!isVisible && '-translate-x-[200%] opacity-0'} absolute bottom-0 top-0 border-r border-primary-900 bg-primary-950 transition-all duration-500 min-[801px]:static`}
        >
            <ul className="flex h-full flex-col gap-2 text-lg">
                {navLinks.map((link) => {
                    const { id, name, href, icon } = link;
                    const Icon = icon;

                    return (
                        <li key={id}>
                            <Link
                                href={href}
                                onClick={onToggle}
                                className={`${pathname === href && 'bg-primary-900'} flex items-center gap-4 px-5 py-3 font-semibold text-primary-200 transition-colors hover:bg-primary-900 hover:text-primary-100`}
                            >
                                <Icon className="h-5 w-5 text-primary-600" />
                                <span className="mt-1">{name}</span>
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
