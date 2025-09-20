import { type GuestId } from '../lib/supabase/dataService/guest.service';
import { getAllBookings } from '../lib/supabase/dataService/booking.service';

export async function checkBookingActionPermission(
    guestId: GuestId,
    bookingId: number,
) {
    const guestBookings = await getAllBookings(guestId);
    const guestBookingsIds = guestBookings.map(({ id }) => id);

    if (!guestBookingsIds.includes(bookingId)) {
        throw new Error('You are not allowed to perform this action');
    }
}
