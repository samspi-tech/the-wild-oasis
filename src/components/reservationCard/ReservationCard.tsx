import Link from 'next/link';
import Image from 'next/image';
import { format, isPast, isToday } from 'date-fns';
import DeleteReservation from './partials/DeleteReservation';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { formatDistanceFromNow } from '@/src/utils/formatDistance';
import { type Bookings } from '@/src/lib/supabase/dataService/booking.service';

type ReservationCardProps = {
    booking: Bookings[number];
    onDelete: (bookingId: number) => void;
};

export default function ReservationCard({
    booking,
    onDelete,
}: ReservationCardProps) {
    const {
        id,
        cabins,
        endDate,
        numGuests,
        numNights,
        startDate,
        totalPrice,
        created_at,
    } = booking;

    return (
        <article className="flex border border-primary-800 max-[630px]:flex-col">
            <header className="relative aspect-square h-32">
                <Image
                    fill
                    src={cabins?.image!}
                    alt={`Cabin ${cabins?.name}`}
                    className="-z-10 border-r border-primary-800 object-cover"
                />
            </header>
            <section className="flex flex-grow flex-col px-6 py-3 max-[630px]:mt-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">
                        {numNights} nights in Cabin {cabins?.name}
                    </h3>
                    {isPast(new Date(startDate!)) ? (
                        <span className="flex h-7 items-center rounded-sm bg-yellow-800 px-3 text-xs font-bold uppercase text-yellow-200">
                            past
                        </span>
                    ) : (
                        <span className="flex h-7 items-center rounded-sm bg-green-800 px-3 text-xs font-bold uppercase text-green-200">
                            upcoming
                        </span>
                    )}
                </div>
                <p className="text-lg text-primary-300">
                    {format(new Date(startDate!), 'EEE, MMM dd yyyy')} (
                    {isToday(new Date(startDate!))
                        ? 'Today'
                        : formatDistanceFromNow(startDate!)}
                    ) &mdash; {format(new Date(endDate!), 'EEE, MMM dd yyyy')}
                </p>
                <div className="mt-auto flex items-baseline gap-5 max-[630px]:my-3 max-[630px]:items-center">
                    <p className="text-xl font-semibold text-accent-400">
                        ${totalPrice}
                    </p>
                    <p className="text-primary-300">&bull;</p>
                    <p className="text-lg text-primary-300">
                        {numGuests} guest{numGuests! > 1 && 's'}
                    </p>
                    <p className="ml-auto text-sm text-primary-400">
                        Booked{' '}
                        {format(new Date(created_at), 'EEE, MMM dd yyyy, p')}
                    </p>
                </div>
            </section>
            {!isPast(startDate!) ? (
                <footer className="flex border-primary-800 min-[631px]:w-[100px] min-[631px]:flex-col min-[631px]:border-l">
                    <Link
                        href={`/account/reservations/edit/${id}`}
                        className="group flex flex-grow items-center gap-2 border-primary-800 px-3 text-xs font-bold uppercase text-primary-300 transition-colors hover:bg-accent-600 hover:text-primary-900 min-[631px]:border-b"
                    >
                        <PencilSquareIcon className="h-5 w-5 text-primary-600 transition-colors group-hover:text-primary-800" />
                        <span className="mt-1 max-[630px]:p-5">Edit</span>
                    </Link>
                    <DeleteReservation onDelete={onDelete} bookingId={id} />
                </footer>
            ) : null}
        </article>
    );
}
