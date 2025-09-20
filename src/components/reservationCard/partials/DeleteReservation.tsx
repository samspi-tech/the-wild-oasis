'use client';

import { useTransition } from 'react';
import { TrashIcon } from '@heroicons/react/24/solid';
import SpinnerMini from '@/src/components/UI/SpinnerMini';

type DeleteReservationProps = {
    bookingId: number;
    onDelete: (bookingId: number) => void;
};

export default function DeleteReservation({
    onDelete,
    bookingId,
}: DeleteReservationProps) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this reservation?')) {
            startTransition(() => onDelete(bookingId));
        }
    };

    return (
        <button
            disabled={isPending}
            onClick={handleDelete}
            className="group flex flex-grow items-center gap-2 px-3 text-xs font-bold uppercase text-primary-300 transition-colors hover:bg-accent-600 hover:text-primary-900 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
        >
            {isPending ? (
                <span className="mx-auto">
                    <SpinnerMini />
                </span>
            ) : (
                <>
                    <TrashIcon className="h-5 w-5 text-primary-600 transition-colors group-hover:text-primary-800" />
                    <span className="mt-1">Delete</span>
                </>
            )}
        </button>
    );
}
