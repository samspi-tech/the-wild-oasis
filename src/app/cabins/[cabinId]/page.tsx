import {
    getAllCabins,
    getSingleCabin,
} from '@/src/lib/dataService/cabin.service';
import { Suspense } from 'react';
import Spinner from '@/src/components/UI/Spinner';
import Reservation from '@/src/components/reservation/Reservation';
import SingleCabin from '@/src/components/singleCabin/SingleCabin';

export type Params = {
    params: { cabinId: string };
};

export async function generateMetadata({ params }: Params) {
    const { cabinId } = params;
    const id = Number(cabinId);

    const cabin = await getSingleCabin(id);

    if (!cabin) return null;

    const { name } = cabin;
    return { title: `Cabin ${name}` };
}

export async function generateStaticParams() {
    const cabins = await getAllCabins();

    const ids = cabins.map(({ id }) => ({
        cabinId: String(id),
    }));

    return ids;
}

export default async function Page({ params }: Params) {
    const { cabinId } = params;
    const id = Number(cabinId);

    const cabin = await getSingleCabin(id);

    if (!cabin) return null;

    const { name } = cabin;

    return (
        <div className="mx-auto mt-8 max-w-6xl">
            <SingleCabin cabin={cabin} />
            <div>
                <h2 className="mb-10 text-center text-5xl font-semibold text-accent-400">
                    Reserve {name} today. Pay on arrival.
                </h2>
                <Suspense fallback={<Spinner />}>
                    <Reservation cabin={cabin} />
                </Suspense>
            </div>
        </div>
    );
}
