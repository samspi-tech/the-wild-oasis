import { isWithinInterval } from 'date-fns';
import { type Range } from '../contexts/ReservationContext';
import { type BookingDates } from '../lib/supabase/dataService/booking.service';

export const isAlreadyBooked = (range: Range, dates: BookingDates) => {
    if (!range) return false;

    const { from, to } = range;

    return (
        from &&
        to &&
        dates.some(({ startDate }) =>
            isWithinInterval(startDate!, {
                start: from,
                end: to,
            }),
        ) &&
        dates.some(({ endDate }) =>
            isWithinInterval(endDate!, {
                start: from,
                end: to,
            }),
        )
    );
};
