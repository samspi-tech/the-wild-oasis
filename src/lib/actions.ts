'use server';

import {
    createBooking,
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
import { type BookingData } from '../components/reservation/partials/ReservationForm';

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

export async function createReservation(
    bookingData: BookingData,
    formData: FormData,
) {
    const guestId = await getGuestId();
    const totalPrice = bookingData.cabinPrice;
    const numGuests = Number(formData.get('numGuests'));
    const observations = <string>formData.get('observations')?.slice(0, 1000);

    const newBooking = {
        guestId,
        numGuests,
        totalPrice,
        observations,
        isPaid: false,
        extrasPrice: 0,
        hasBreakfast: false,
        status: 'unconfirmed',
        ...bookingData,
    };

    await createBooking(newBooking);

    const { cabinId } = bookingData;
    revalidatePath(`/cabins/${cabinId}`);

    redirect('/cabins/thankYou');
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
