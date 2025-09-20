import { getSingleCabin } from '@/src/lib/supabase/dataService/cabin.service';
import { getSingleBooking } from '@/src/lib/supabase/dataService/booking.service';
import UpdateReservationForm from '@/src/components/updateReservationForm/UpdateReservationForm';

export const metadata = {
    title: 'Edit reservation',
};

type SingleReservationProps = {
    params: { reservationId: string };
};

export default async function Page({ params }: SingleReservationProps) {
    const { reservationId } = params;
    const id = Number(reservationId);

    const booking = await getSingleBooking(id);
    const cabin = await getSingleCabin(booking.cabinId);

    return (
        <div>
            <h2 className="mb-7 text-2xl font-semibold text-accent-400">
                Edit Reservation #{reservationId}
            </h2>
            <UpdateReservationForm
                booking={booking}
                maxCapacity={cabin?.maxCapacity!}
            />
        </div>
    );
}
