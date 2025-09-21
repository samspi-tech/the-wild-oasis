import { supabase } from '../supabase';
import { eachDayOfInterval } from 'date-fns';
import { type GuestId } from './guest.service';
import { type Tables } from '../database.types';
import { type QueryData } from '@supabase/supabase-js';

const bookingsQuery = supabase.from('bookings').select('startDate, endDate');

export type BookingDates = QueryData<typeof bookingsQuery>;

export async function getBookedDatesByCabinId(cabinId: number) {
    type Today = string | Date;

    let today: Today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    today = today.toISOString();

    bookingsQuery
        .eq('cabinId', cabinId)
        .or(`startDate.gte.${today},status.eq.checked-in`);

    const { data, error } = await bookingsQuery;

    if (error) throw new Error('Bookings could not get loaded');

    data.map((booking) => {
        const { startDate, endDate } = booking;

        return eachDayOfInterval({
            start: new Date(startDate!),
            end: new Date(endDate!),
        });
    }).flat();

    const bookedDates: BookingDates = data;
    return bookedDates;
}

export type Settings = Tables<'settings'>;

export async function getBookingSettings(): Promise<Settings> {
    const { data, error } = await supabase
        .from('settings')
        .select('*')
        .single();

    if (error) throw new Error('Settings could not be loaded');

    return data;
}

const allBookingsQuery = supabase
    .from('bookings')
    .select(
        'id, created_at, startDate, endDate, numNights, numGuests, totalPrice, guestId, cabinId, cabins(name, image)',
    );

export type Bookings = QueryData<typeof allBookingsQuery>;

export async function getAllBookings(guestId: GuestId) {
    const { data, error } = await allBookingsQuery
        .eq('guestId', guestId!)
        .order('startDate');

    if (error) throw new Error('Bookings could not get loaded');

    const bookings: Bookings = data;
    return bookings;
}

export type SingleBooking = Tables<'bookings'>;

export async function getSingleBooking(id: number) {
    const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw new Error('Booking could not get loaded');

    return data;
}

type UpdatedFields = {
    numGuests: number;
    observations: string;
};

export async function updateBooking(id: number, updatedFields: UpdatedFields) {
    const { error } = await supabase
        .from('bookings')
        .update(updatedFields)
        .eq('id', id);

    if (error) throw new Error('Booking could not be updated');
}

export async function deleteBooking(id: number) {
    const { data, error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', id);

    if (error) throw new Error('Booking could not be deleted');

    return data;
}
