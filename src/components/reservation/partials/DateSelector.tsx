'use client';

import 'react-day-picker/dist/style.css';
import { isWithinInterval } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { type Cabin } from '@/src/lib/dataService/cabin.service';
import { type Settings } from '@/src/lib/dataService/booking.service';
import { useContext } from 'react';
import { ReservationContext } from '@/src/contexts/ReservationContext';
import { useReservationContenxt } from '@/src/hooks/useReservationContext';

// function isAlreadyBooked(range, datesArr) {
//     return (
//         range.from &&
//         range.to &&
//         datesArr.some((date) =>
//             isWithinInterval(date, {
//                 start: range.from,
//                 end: range.to,
//             }),
//         )
//     );
// }

type DateSelectorProps = {
    cabin: Cabin;
    bookedDates: Date[];
    bookingSettings: Settings;
};

export default function DateSelector({
    cabin,
    bookedDates,
    bookingSettings,
}: DateSelectorProps) {
    const { range, setRange, resetRange } = useReservationContenxt();

    // CHANGE
    const discount = 23;
    const numNights = 23;
    const cabinPrice = 23;
    const regularPrice = 23;

    const { minBookingLength, maxBookingLength } = bookingSettings;

    const currentDate = new Date();
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    return (
        <div className="flex flex-col justify-between">
            <DayPicker
                mode="range"
                selected={range}
                onSelect={setRange}
                max={maxBookingLength!}
                captionLayout="dropdown"
                min={minBookingLength! + 1}
                className="my-auto place-self-center"
                startMonth={new Date(currentYear, currentMonth)}
                endMonth={new Date(currentYear + 5, 11)}
                hidden={{ before: currentDate }}
            />
            <div className="flex h-[72px] items-center justify-between bg-accent-500 px-8 text-primary-800">
                <div className="flex items-baseline gap-6">
                    <p className="flex items-baseline gap-2">
                        {discount > 0 ? (
                            <>
                                <span className="text-2xl">
                                    ${regularPrice - discount}
                                </span>
                                <span className="font-semibold text-primary-700 line-through">
                                    ${regularPrice}
                                </span>
                            </>
                        ) : (
                            <span className="text-2xl">${regularPrice}</span>
                        )}
                        <span className="">/night</span>
                    </p>
                    {numNights ? (
                        <>
                            <p className="bg-accent-600 px-3 py-2 text-2xl">
                                <span>&times;</span> <span>{numNights}</span>
                            </p>
                            <p>
                                <span className="text-lg font-bold uppercase">
                                    Total
                                </span>{' '}
                                <span className="text-2xl font-semibold">
                                    ${cabinPrice}
                                </span>
                            </p>
                        </>
                    ) : null}
                </div>
                {range?.from || range?.to ? (
                    <button
                        onClick={resetRange}
                        className="border border-primary-800 px-4 py-2 text-sm font-semibold"
                    >
                        Clear
                    </button>
                ) : null}
            </div>
        </div>
    );
}
