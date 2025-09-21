'use client';

import SubmitButton from '../UI/SubmitButton';
import { updateReservation } from '@/src/lib/actions';
import ReservationGuestNum from '../reservationGuestNum/RervationGuestNum';
import { type SingleBooking } from '@/src/lib/supabase/dataService/booking.service';

type UpdateReservationFormProps = {
    booking: SingleBooking;
    maxCapacity: number | null;
};

export default function UpdateReservationForm({
    booking,
    maxCapacity,
}: UpdateReservationFormProps) {
    const { id, observations, numGuests } = booking;

    const observation = observations ?? '';

    const updateReservationWithId = updateReservation.bind(null, id);

    return (
        <form
            action={updateReservationWithId}
            className="flex flex-col gap-6 bg-primary-900 px-12 py-8 text-lg"
        >
            <div className="space-y-2">
                <label htmlFor="numGuests">How many guests?</label>
                <select
                    required
                    id="numGuests"
                    name="numGuests"
                    defaultValue={numGuests!}
                    className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
                >
                    <option value="" key="">
                        Select number of guests...
                    </option>
                    <ReservationGuestNum maxCapacity={maxCapacity} />
                </select>
            </div>
            <div className="space-y-2">
                <label htmlFor="observations">
                    Anything we should know about your stay?
                </label>
                <textarea
                    id="observations"
                    name="observations"
                    defaultValue={observation}
                    className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
                />
            </div>
            <SubmitButton pendingLabel="Updating...">
                Update reservation
            </SubmitButton>
        </form>
    );
}
