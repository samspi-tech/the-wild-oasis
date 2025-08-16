import {
    HomeIcon,
    UserIcon,
    CalendarDaysIcon,
} from '@heroicons/react/24/solid';

export const navLinks = [
    {
        id: 'side-nav-link-1',
        name: 'Home',
        href: '/account',
        icon: HomeIcon,
    },
    {
        id: 'side-nav-link-2',
        name: 'Reservations',
        href: '/account/reservations',
        icon: CalendarDaysIcon,
    },
    {
        id: 'side-nav-link-3',
        name: 'Guest profile',
        href: '/account/profile',
        icon: UserIcon,
    },
];
