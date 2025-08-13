import Logo from './components/Logo';
import { type ReactNode } from 'react';
import Navigation from './components/Navigation';

export const metadata = {
    title: 'The Wild Oasis',
};

type RootLayoutProps = {
    children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
            <body>
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
