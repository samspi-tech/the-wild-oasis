import CabinCard from '@/src/components/CabinCard';
import { filterCabins } from '@/src/utils/filterCabins';
import { getAllCabins } from '@/src/lib/dataService/cabin.service';

type CabinListProps = {
    filter: string;
};

export default async function CabinList({ filter }: CabinListProps) {
    const cabins = await getAllCabins();

    const filteredCabins = filterCabins(filter, cabins);

    return (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-12 xl:gap-14">
            {filteredCabins.map((cabin) => (
                <CabinCard cabin={cabin} key={cabin.id} />
            ))}
        </div>
    );
}
