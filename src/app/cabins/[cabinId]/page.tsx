import Image from 'next/image';
import { getCabin, getCabins } from '@/src/lib/dataService';
import { EyeSlashIcon, MapPinIcon, UsersIcon } from '@heroicons/react/24/solid';

type CabinPageProps = {
    params: { cabinId: number };
};

export async function generateMetadata({ params }: CabinPageProps) {
    const { cabinId } = params;
    const cabin = await getCabin(cabinId);

    if (!cabin) return null;

    const { name } = cabin;
    return { title: `Cabin ${name}` };
}

export async function generateStaticParams() {
    const cabins = await getCabins();

    const ids = cabins.map((cabin) => ({
        cabinId: String(cabin.id),
    }));

    return ids;
}

export default async function Page({ params }: CabinPageProps) {
    const { cabinId } = params;
    const cabin = await getCabin(cabinId);

    if (!cabin) return null;

    const {
        id,
        name,
        image,
        discount,
        description,
        maxCapacity,
        regularPrice,
    } = cabin;

    return (
        <div className="mx-auto mt-8 max-w-6xl">
            <div className="mb-24 grid gap-20 border border-primary-800 px-10 py-3 min-[926px]:grid-cols-[3fr_4fr]">
                <div className="relative hidden -translate-x-3 scale-[1.15] min-[926px]:block">
                    <Image
                        fill
                        src={image!}
                        alt={`Cabin ${name}`}
                        className="object-cover"
                    />
                </div>
                <div>
                    <h3 className="mb-5 bg-primary-950 p-6 pb-1 text-5xl font-black text-accent-100 min-[376px]:text-7xl min-[926px]:w-[150%] min-[926px]:translate-x-[-254px]">
                        Cabin {name}
                    </h3>
                    <p className="mb-10 text-lg text-primary-300">
                        {description}
                    </p>
                    <ul className="mb-7 flex flex-col gap-4">
                        <li className="flex items-center gap-3">
                            <UsersIcon className="h-5 w-5 text-primary-600" />
                            <span className="text-lg">
                                For up to{' '}
                                <span className="font-bold">{maxCapacity}</span>{' '}
                                guests
                            </span>
                        </li>
                        <li className="flex items-center gap-3">
                            <MapPinIcon className="h-5 w-5 text-primary-600" />
                            <span className="text-lg">
                                Located in the heart of the{' '}
                                <span className="font-bold">Dolomites</span>{' '}
                                (Italy)
                            </span>
                        </li>
                        <li className="flex items-center gap-3">
                            <EyeSlashIcon className="h-5 w-5 text-primary-600" />
                            <span className="text-lg">
                                Privacy <span className="font-bold">100%</span>{' '}
                                guaranteed
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                <h2 className="text-center text-5xl font-semibold">
                    Reserve today. Pay on arrival.
                </h2>
            </div>
        </div>
    );
}
