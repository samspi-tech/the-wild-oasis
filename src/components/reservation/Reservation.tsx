import {
    getBookingSettings,
    getBookedDatesByCabinId,
} from '@/src/lib/dataService/booking.service';
import DateSelector from './partials/DateSelector';
import ReservationForm from './partials/ReservationForm';
import { type Cabin } from '@/src/lib/dataService/cabin.service';

type ReservationProps = {
    cabin: Cabin;
};

export default async function Reservation({ cabin }: ReservationProps) {
    const { id } = cabin;

    const [bookingSettings, bookedDates] = await Promise.all([
        getBookingSettings(),
        getBookedDatesByCabinId(id),
    ]);

    return (
        <div className="grid min-h-[400px] border border-primary-800 max-[758px]:gap-10 min-[759px]:grid-cols-2">
            <DateSelector
                cabin={cabin}
                bookedDates={bookedDates}
                bookingSettings={bookingSettings}
            />
            <ReservationForm cabin={cabin} />
        </div>
    );
}
