import ReservationCard from '@/src/components/ReservationCard';

export const metadata = {
    title: 'Reservations',
};

export type Booking = {
    id: number;
    status: string;
    endDate: string;
    guestId: number;
    startDate: string;
    numNights: number;
    numGuests: number;
    totalPrice: number;
    created_at: string;
    cabins: {
        name: string;
        image: string;
    };
};

export default function Page() {
    // CHANGE
    const bookings: Booking[] = [];

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
                <ul className="space-y-6">
                    {bookings.map((booking) => (
                        <ReservationCard booking={booking} key={booking.id} />
                    ))}
                </ul>
            )}
        </div>
    );
}
