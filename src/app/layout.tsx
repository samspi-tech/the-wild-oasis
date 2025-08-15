import '@/src/styles/globals.css';
import { type ReactNode } from 'react';
import Header from '@/src/components/Header';
import { Josefin_Sans } from 'next/font/google';

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
                className={`${josefinFont.className} relative flex min-h-screen flex-col bg-primary-950 text-primary-100 antialiased`}
            >
                <Header />
                <div className="flex-1 px-8 py-12">
                    <main className="mx-auto max-w-7xl">{children}</main>
                </div>
            </body>
        </html>
    );
}
