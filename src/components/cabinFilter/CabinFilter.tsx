'use client';

import { cabinFilters } from './dataSource';
import { createQueryString } from '@/src/utils/createQueryString';
import CabinFilterButton from '@/src/components/UI/CabinFilterButton';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function CabinFilter() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const activeFilter = searchParams.get('capacity');

    const handleFilter = (filter: string) => {
        const capacity = createQueryString('capacity', filter, searchParams);

        router.replace(pathname + '?' + capacity, { scroll: false });
    };

    return (
        <div className="mb-8 flex justify-center min-[425px]:justify-end">
            <div className="flex border border-primary-800 max-[410px]:flex-wrap">
                {cabinFilters.map((cabinFilter) => {
                    const { id, name, filter } = cabinFilter;

                    return (
                        <CabinFilterButton
                            key={id}
                            name={name}
                            filter={filter}
                            onFilter={handleFilter}
                            activeFilter={activeFilter}
                        />
                    );
                })}
            </div>
        </div>
    );
}
