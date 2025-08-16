import Logo from '@/src/components/UI/Logo';
import Navigation from '@/src/components/navigation/Navigation';

export default function Header() {
    return (
        <header className="border-b border-primary-900 px-8 py-5">
            <div className="mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:justify-between md:gap-0">
                <Logo />
                <Navigation />
            </div>
        </header>
    );
}
