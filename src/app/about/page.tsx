import Link from 'next/link';
import Image from 'next/image';
import aboutImageOne from '@/public/about-1.jpg';
import aboutImageTwo from '@/public/about-2.jpg';

export const metadata = {
    title: 'About',
};

export default function Page() {
    return (
        <div className="grid grid-cols-5 items-center gap-y-14 text-lg lg:gap-x-24 lg:gap-y-32">
            <div className="order-1 col-span-5 lg:col-span-3">
                <h1 className="mb-10 text-4xl font-medium text-accent-400">
                    Welcome to The Wild Oasis
                </h1>
                <div className="space-y-8">
                    <p>
                        Where nature's beauty and comfortable living blend
                        seamlessly. Hidden away in the heart of the Italian
                        Dolomites, this is your paradise away from home. But
                        it's not just about the luxury cabins. It's about the
                        experience of reconnecting with nature and enjoying
                        simple pleasures with family.
                    </p>
                    <p>
                        Our 8 luxury cabins provide a cozy base, but the real
                        freedom and peace you'll find in the surrounding
                        mountains. Wander through lush forests, breathe in the
                        fresh air, and watch the stars twinkle above from the
                        warmth of a campfire or your hot tub.
                    </p>
                    <p>
                        This is where memorable moments are made, surrounded by
                        nature's splendor. It's a place to slow down, relax, and
                        feel the joy of being together in a beautiful setting.
                    </p>
                </div>
            </div>
            <div className="order-2 col-span-5 lg:col-span-2">
                <Image
                    quality={80}
                    placeholder="blur"
                    src={aboutImageOne}
                    alt="Family sitting around a fire pit in front of cabin"
                />
            </div>
            <div className="order-4 col-span-5 lg:order-3 lg:col-span-2">
                <Image
                    quality={80}
                    placeholder="blur"
                    src={aboutImageTwo}
                    alt="Family that manages The Wild Oasis"
                />
            </div>
            <div className="order-3 col-span-5 lg:order-4 lg:col-span-3">
                <h1 className="mb-10 text-4xl font-medium text-accent-400">
                    Managed by our family since 1962
                </h1>
                <div className="space-y-8">
                    <p>
                        Since 1962, The Wild Oasis has been a cherished
                        family-run retreat. Started by our grandparents, this
                        haven has been nurtured with love and care, passing down
                        through our family as a testament to our dedication to
                        creating a warm, welcoming environment.
                    </p>
                    <p>
                        Over the years, we've maintained the essence of The Wild
                        Oasis, blending the timeless beauty of the mountains
                        with the personal touch only a family business can
                        offer. Here, you're not just a guest; you're part of our
                        extended family. So join us at The Wild Oasis soon,
                        where tradition meets tranquility, and every visit is
                        like coming home.
                    </p>
                </div>
            </div>
            <div className="order-last col-span-5">
                <Link
                    href="/cabins"
                    className="mt-4 inline-block bg-accent-500 px-8 py-5 text-lg font-semibold text-primary-800 transition-all hover:bg-accent-600"
                >
                    Explore our luxury cabins
                </Link>
            </div>
        </div>
    );
}
