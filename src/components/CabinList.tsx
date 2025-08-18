import { getCabins } from '@/src/lib/dataService';
import CabinCard from '@/src/components/CabinCard';

export type Cabin = {
    id: number;
    name: string;
    image: string;
    discount: number;
    maxCapacity: number;
    regularPrice: number;
};

export default async function CabinList() {
    const cabins: Cabin[] = await getCabins();

    if (!cabins.length) return null;

    return (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-12 xl:gap-14">
            {cabins.map((cabin) => (
                <CabinCard cabin={cabin} key={cabin.id} />
            ))}
        </div>
    );
}
