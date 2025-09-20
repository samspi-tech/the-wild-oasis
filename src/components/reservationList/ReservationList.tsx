'use client';

import { useOptimistic } from 'react';
import { deleteReservation } from '@/src/lib/actions';
import ReservationCard from '../reservationCard/ReservationCard';
import { type Bookings } from '@/src/lib/supabase/dataService/booking.service';

type ReservationListProps = {
    bookings: Bookings;
};

export default function ReservationList({ bookings }: ReservationListProps) {
    const [optimisticBookings, optimisticDelete] = useOptimistic(
        bookings,
        (curBooking, bookingId) => {
            return curBooking.filter(({ id }) => id !== bookingId);
        },
    );

    const handleDeleteReservation = async (bookingId: number) => {
        optimisticDelete(bookingId);
        await deleteReservation(bookingId);
    };

    return (
        <ul className="space-y-6">
            {optimisticBookings.map((booking) => (
                <ReservationCard
                    key={booking.id}
                    booking={booking}
                    onDelete={handleDeleteReservation}
                />
            ))}
        </ul>
    );
}
