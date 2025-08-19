import { supabase } from './supabase';
import { notFound } from 'next/navigation';
import { eachDayOfInterval } from 'date-fns';
import { type Tables } from './database.types';
import { type QueryData } from '@supabase/supabase-js';

export type Cabin = Tables<'cabins'>;

export async function getCabin(id: number): Promise<Cabin | null> {
    const { data, error } = await supabase
        .from('cabins')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        process.env.NODE_ENV === 'development' && console.error(error);
        notFound();
    }

    return data;
}

const cabinsQuery = supabase
    .from('cabins')
    .select('id, name, maxCapacity, regularPrice, discount, image')
    .order('name');

export type Cabins = QueryData<typeof cabinsQuery>;

export async function getCabins() {
    const { data, error } = await cabinsQuery;

    if (error) {
        process.env.NODE_ENV === 'development' && console.error(error);
        throw new Error('Cabins could not be loaded');
    }

    const cabins: Cabins = data;

    return cabins;
}

export async function getCabinPrice(id: number) {
    const { data, error } = await supabase
        .from('cabins')
        .select('regularPrice, discount')
        .eq('id', id)
        .single();

    if (error && process.env.NODE_ENV === 'development') console.error(error);

    return data;
}

export async function getGuest(email: string) {
    const { data, error } = await supabase
        .from('guests')
        .select('*')
        .eq('email', email)
        .single();

    return data;
}

export async function getBooking(id: number) {
    const { data, error, count } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        process.env.NODE_ENV === 'development' && console.error(error);
        throw new Error('Booking could not get loaded');
    }

    return data;
}

export async function getBookings(guestId: number) {
    const { data, error, count } = await supabase
        .from('bookings')
        .select(
            'id, created_at, startDate, endDate, numNights, numGuests, totalPrice, guestId, cabinId, cabins(name, image)',
        )
        .eq('guestId', guestId)
        .order('startDate');

    if (error) {
        process.env.NODE_ENV === 'development' && console.error(error);
        throw new Error('Bookings could not get loaded');
    }

    return data;
}

export async function getBookedDatesByCabinId(cabinId: number) {
    type Today = string | Date;

    let today: Today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    today = today.toISOString();

    const bookingsQuery = supabase
        .from('bookings')
        .select('startDate, endDate')
        .eq('cabinId', cabinId)
        .or(`startDate.gte.${today},status.eq.checked-in`);

    type BookingDates = QueryData<typeof bookingsQuery>;

    const { data, error } = await bookingsQuery;

    if (error) {
        process.env.NODE_ENV === 'development' && console.error(error);
        throw new Error('Bookings could not get loaded');
    }

    const bookedDates: BookingDates = data;

    return bookedDates
        .map((booking) => {
            const { startDate, endDate } = booking;

            return eachDayOfInterval({
                start: new Date(startDate!),
                end: new Date(endDate!),
            });
        })
        .flat();
}

export async function getSettings() {
    const { data, error } = await supabase
        .from('settings')
        .select('*')
        .single();

    if (error) {
        process.env.NODE_ENV === 'development' && console.error(error);
        throw new Error('Settings could not be loaded');
    }

    return data;
}

export async function getCountries() {
    try {
        const res = await fetch(
            'https://restcountries.com/v2/all?fields=name,flag',
        );
        const countries = await res.json();
        return countries;
    } catch {
        throw new Error('Could not fetch countries');
    }
}

export async function createGuest(newGuest: {}) {
    const { data, error } = await supabase.from('guests').insert([newGuest]);

    if (error) {
        process.env.NODE_ENV === 'development' && console.error(error);
        throw new Error('Guest could not be created');
    }

    return data;
}

export async function createBooking(newBooking: {}) {
    const { data, error } = await supabase
        .from('bookings')
        .insert([newBooking])
        .select()
        .single();

    if (error) {
        process.env.NODE_ENV === 'development' && console.error(error);
        throw new Error('Booking could not be created');
    }

    return data;
}

export async function updateGuest(id: number, updatedFields: {}) {
    const { data, error } = await supabase
        .from('guests')
        .update(updatedFields)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        process.env.NODE_ENV === 'development' && console.error(error);
        throw new Error('Guest could not be updated');
    }
    return data;
}

export async function updateBooking(id: number, updatedFields: {}) {
    const { data, error } = await supabase
        .from('bookings')
        .update(updatedFields)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        process.env.NODE_ENV === 'development' && console.error(error);
        throw new Error('Booking could not be updated');
    }
    return data;
}

export async function deleteBooking(id: number) {
    const { data, error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', id);

    if (error) {
        process.env.NODE_ENV === 'development' && console.error(error);
        throw new Error('Booking could not be deleted');
    }
    return data;
}
