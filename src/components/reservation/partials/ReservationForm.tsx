'use client';

import { type User } from 'next-auth';
import { differenceInDays } from 'date-fns';
import { createReservation } from '@/src/lib/actions';
import { type Cabin } from '@/src/lib/supabase/dataService/cabin.service';
import { useReservationContenxt } from '@/src/hooks/useReservationContext';
import ReservationGuestNum from '@/src/components/reservationGuestNum/RervationGuestNum';
import SubmitButton from '../../UI/SubmitButton';

type ReservationFormProps = {
    user: User;
    cabin: Cabin;
};

export type BookingData = {
    cabinId: number;
    numNights: number;
    cabinPrice: number;
    endDate: Date | undefined;
    startDate: Date | undefined;
};

export default function ReservationForm({ cabin, user }: ReservationFormProps) {
    const { range, resetRange } = useReservationContenxt();

    const { maxCapacity, regularPrice, discount, id: cabinId } = cabin;

    const startDate = range?.from!;
    const endDate = range?.to!;

    const numNights = differenceInDays(endDate!, startDate!);
    const cabinPrice = numNights * (regularPrice! - discount!);

    const bookingData: BookingData = {
        cabinId,
        endDate,
        startDate,
        numNights,
        cabinPrice,
    };

    const createReservationWithData = createReservation.bind(null, bookingData);

    return (
        <div className="scale-[1.01]">
            <div className="flex items-center justify-between bg-primary-800 px-16 py-2 text-primary-300">
                <p>Logged in as</p>
                <div className="flex items-center gap-4">
                    <img
                        alt={user.name!}
                        src={user.image!}
                        referrerPolicy="no-referrer"
                        className="h-8 rounded-full"
                    />
                    <p>{user.name}</p>
                </div>
            </div>
            <form
                action={async (formData) => {
                    await createReservationWithData(formData);
                    resetRange();
                }}
                className="flex flex-col gap-5 bg-primary-900 px-16 py-10 text-lg"
            >
                <div className="space-y-2">
                    <label htmlFor="numGuests">How many guests?</label>
                    <select
                        id="numGuests"
                        name="numGuests"
                        className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
                        required
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
                        className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
                        placeholder="Any pets, allergies, special requirements, etc.?"
                    />
                </div>
                <div className="flex items-center justify-end gap-6">
                    {!(startDate && endDate) ? (
                        <p className="px-8 py-4 text-base text-primary-300">
                            Start by selecting dates
                        </p>
                    ) : (
                        <SubmitButton pendingLabel="Reserving...">
                            Reserve now
                        </SubmitButton>
                    )}
                </div>
            </form>
        </div>
    );
}
