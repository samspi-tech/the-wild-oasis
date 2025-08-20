import CabinCard from '@/src/components/CabinCard';
import { getAllCabins } from '@/src/lib/dataService/cabin.service';

export default async function CabinList() {
    const cabins = await getAllCabins();

    if (!cabins.length) return null;

    return (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-12 xl:gap-14">
            {cabins.map((cabin) => (
                <CabinCard cabin={cabin} key={cabin.id} />
            ))}
        </div>
    );
}
