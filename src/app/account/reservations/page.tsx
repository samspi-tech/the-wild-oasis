import { auth } from '@/src/lib/auth';
import ReservationList from '@/src/components/reservationList/ReservationList';
import { getAllBookings } from '@/src/lib/supabase/dataService/booking.service';

export const metadata = {
    title: 'Reservations',
};

export default async function Page() {
    const session = await auth();
    const id = session?.user.guestId;

    const bookings = await getAllBookings(id);

    return (
        <div>
            <h2 className="mb-7 text-2xl font-semibold text-accent-400">
                Your reservations
            </h2>

            {bookings.length === 0 ? (
                <p className="text-lg">
                    You have no reservations yet. Check out our{' '}
                    <a className="text-accent-500 underline" href="/cabins">
                        luxury cabins &rarr;
                    </a>
                </p>
            ) : (
                <ReservationList bookings={bookings} />
            )}
        </div>
    );
}
