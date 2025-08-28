'use client';

import { format } from 'date-fns';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useReservationContenxt } from '@/src/hooks/useReservationContext';

export default function ReservationReminder() {
    const { range, resetRange } = useReservationContenxt();

    if (!range?.from || !range?.to) return null;

    const { from, to } = range;

    const fromDate = format(new Date(from), 'MMM dd yyyy');
    const toDate = format(new Date(to), 'MMM dd yyyy');

    return (
        <div className="text fixed bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-8 rounded-full bg-accent-500 px-8 py-5 font-semibold text-primary-800 shadow-xl shadow-slate-900">
            <p>
                <span>👋</span> Don't forget to reserve your dates <br /> from{' '}
                {fromDate} to {toDate}
            </p>
            <button
                onClick={resetRange}
                className="rounded-full p-1 transition-all hover:bg-accent-600"
            >
                <XMarkIcon className="h-5 w-5" />
            </button>
        </div>
    );
}
