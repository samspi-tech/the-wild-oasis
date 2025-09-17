'use server';

import { signIn, signOut } from './auth';
import { revalidatePath } from 'next/cache';
import { getSession } from '../utils/getSession';
import { updateGuest } from './supabase/dataService/guest.service';
import { deleteBooking } from './supabase/dataService/booking.service';
import { getGuestId, getUpdateData } from '../utils/guestProfileUpdate';
import { checkDeleteBookingPermission } from '../utils/checkDeleteBookingPermission';

export async function signInAction() {
    await signIn('google', { redirectTo: '/account' });
}

export async function signOutAction() {
    await signOut({ redirectTo: '/' });
}

export async function updateGuestProfile(formData: FormData) {
    const guestId = await getGuestId();
    const updateData = getUpdateData(formData);

    await updateGuest(guestId, updateData);
    revalidatePath('/account/profile');
}

export async function deleteReservation(bookingId: number) {
    const session = await getSession();
    const guestId = session.user.guestId;

    await checkDeleteBookingPermission(guestId, bookingId);

    await deleteBooking(bookingId);
    revalidatePath('/account/reservations');
}
