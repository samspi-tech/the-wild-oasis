'use client';

import {
    type Settings,
    type BookingDates,
} from '@/src/lib/supabase/dataService/booking.service';
import 'react-day-picker/dist/style.css';
import { DayPicker } from 'react-day-picker';
import { isAlreadyBooked } from '@/src/utils/isAlreadyBooked';
import { differenceInDays, isPast, isWithinInterval } from 'date-fns';
import { type Cabin } from '@/src/lib/supabase/dataService/cabin.service';
import { useReservationContenxt } from '@/src/hooks/useReservationContext';

type DateSelectorProps = {
    cabin: Cabin;
    bookedDates: BookingDates;
    bookingSettings: Settings;
};

export default function DateSelector({
    cabin,
    bookedDates,
    bookingSettings,
}: DateSelectorProps) {
    const { discount, regularPrice } = cabin;

    const { minBookingLength, maxBookingLength } = bookingSettings;

    const { range, setRange, resetRange } = useReservationContenxt();

    const displayRange = isAlreadyBooked(range, bookedDates)
        ? { from: undefined, to: undefined }
        : range;

    const numNights = differenceInDays(displayRange?.to!, displayRange?.from!);
    const cabinPrice = numNights * (regularPrice! - discount!);

    const curMonth = new Date().getMonth();
    const curYear = new Date().getFullYear();

    return (
        <div className="flex flex-col justify-between">
            <DayPicker
                mode="range"
                onSelect={setRange}
                selected={displayRange}
                max={maxBookingLength!}
                captionLayout="dropdown"
                min={minBookingLength! + 1}
                className="my-auto place-self-center"
                startMonth={new Date(curYear, curMonth)}
                endMonth={new Date(curYear + 5, 11)}
                disabled={(curDate) =>
                    isPast(curDate) ||
                    bookedDates.some((date) =>
                        isWithinInterval(curDate, {
                            start: date.startDate!,
                            end: date.endDate!,
                        }),
                    )
                }
            />
            <div className="flex h-[72px] items-center justify-between bg-accent-500 px-8 text-primary-800">
                <div className="flex items-baseline gap-6">
                    <p className="flex items-baseline gap-2">
                        {discount! > 0 ? (
                            <>
                                <span className="text-2xl">
                                    ${regularPrice! - discount!}
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
