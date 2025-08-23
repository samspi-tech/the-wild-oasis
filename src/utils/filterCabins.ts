import { type Cabins } from '../lib/dataService/cabin.service';

export function filterCabins(filter: string, cabins: Cabins) {
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
