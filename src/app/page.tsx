import Link from 'next/link';
import Image from 'next/image';
import bg from '@/public/bg.png';

export default function Page() {
    return (
        <section className="mt-24">
            <Image
                fill
                src={bg}
                quality={80}
                placeholder="blur"
                className="object-cover object-top"
                alt="Mountains and forests with two cabins"
            />
            <header className="relative z-10 text-center">
                <h1 className="mb-10 text-7xl font-normal tracking-tight text-primary-50 md:text-8xl">
                    Welcome to paradise.
                </h1>
                <Link
                    href="/cabins"
                    className="bg-accent-500 px-8 py-6 text-lg font-semibold text-primary-800 transition-all hover:bg-accent-600"
                >
                    Explore luxury cabins
                </Link>
            </header>
        </section>
    );
}
