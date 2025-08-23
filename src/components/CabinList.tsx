import CabinCard from '@/src/components/CabinCard';
import { type Cabins, getAllCabins } from '@/src/lib/dataService/cabin.service';

function filterCabins(filter: string, cabins: Cabins) {
    switch (true) {
        case filter === 'small': {
            return cabins.filter(({ maxCapacity }) => maxCapacity! <= 3);
        }
        case filter === 'medium': {
            return cabins.filter(
                ({ maxCapacity }) => maxCapacity! >= 4 && maxCapacity! <= 7,
            );
        }
        case filter === 'large': {
            return cabins.filter(({ maxCapacity }) => maxCapacity! >= 8);
        }
        default: {
            return cabins;
        }
    }
}

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
