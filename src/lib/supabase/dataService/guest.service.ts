import { supabase } from '../supabase';
import { type Tables } from '../database.types';

type Guests = Tables<'guests'>;

type Email = string | null | undefined;

export async function getGuest(email: Email): Promise<Guests | null> {
    const { data } = await supabase
        .from('guests')
        .select('*')
        .eq('email', email)
        .single();

    return data;
}

type NewGuest = {
    email: string | null | undefined;
    fullName: string | null | undefined;
};

export async function createGuest(newGuest: NewGuest) {
    const { data, error } = await supabase.from('guests').insert([newGuest]);

    if (error) throw new Error('Guest could not be created');

    return data;
}
