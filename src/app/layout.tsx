import '@/src/styles/globals.css';
import { type ReactNode } from 'react';
import Logo from '@/src/components/Logo';
import { Josefin_Sans } from 'next/font/google';
import Navigation from '@/src/components/Navigation';

export const metadata = {
    title: {
        template: '%s / The Wild Oasis',
        default: 'Welcome / The Wild Oasis',
    },
    description:
        'Luxurious cabin hotel, located in the heart of the Italian Dolomites, sorrounded by beautiful mountains and dark forests',
};

const josefinFont = Josefin_Sans({
    subsets: ['latin'],
    display: 'swap',
});

type RootLayoutProps = {
    children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
            <body
                className={`${josefinFont.className} bg-primary-950 text-primary-100 min-h-screen`}>
                <header>
                    <Logo />
                    <Navigation />
                </header>
                <main>{children}</main>
                <footer>Copyright by The Wild Oasis</footer>
            </body>
        </html>
    );
}
