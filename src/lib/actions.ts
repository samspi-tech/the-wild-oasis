'use server';

import {
    deleteBooking,
    updateBooking,
} from './supabase/dataService/booking.service';
import { signIn, signOut } from './auth';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getBookingUpdateData } from '../utils/reservationUpdate';
import { updateGuest } from './supabase/dataService/guest.service';
import { getGuestId, getGuestUpdateData } from '../utils/guestProfileUpdate';
import { checkBookingActionPermission } from '../utils/checkBookingActionPermission';

export async function signInAction() {
    await signIn('google', { redirectTo: '/account' });
}

export async function signOutAction() {
    await signOut({ redirectTo: '/' });
}

export async function updateGuestProfile(formData: FormData) {
    const guestId = await getGuestId();
    const updateData = getGuestUpdateData(formData);

    await updateGuest(guestId, updateData);

    revalidatePath('/account/profile');
}

export async function updateReservation(bookingId: number, formData: FormData) {
    const guestId = await getGuestId();
    await checkBookingActionPermission(guestId, bookingId);

    const updateData = getBookingUpdateData(formData);
    await updateBooking(bookingId, updateData);

    revalidatePath(`/account/reservations/edit/${bookingId}`);
    redirect('/account/reservations');
}

export async function deleteReservation(bookingId: number) {
    const guestId = await getGuestId();
    await checkBookingActionPermission(guestId, bookingId);

    await deleteBooking(bookingId);

    revalidatePath('/account/reservations');
}
