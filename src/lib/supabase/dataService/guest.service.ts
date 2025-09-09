import { supabase } from '../supabase';
import { type Tables } from '../database.types';

export type Guests = Tables<'guests'>;

type Email = string | null | undefined;

export async function getGuest(email: Email): Promise<Guests | null> {
    const { data } = await supabase
        .from('guests')
        .select('*')
        .eq('email', email!)
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

type GuestId = number | undefined;

type UpdatedFields = {
    nationalID: string;
    nationality: string;
    countryFlag: string;
};

export async function updateGuest(id: GuestId, updatedFields: UpdatedFields) {
    const { data, error } = await supabase
        .from('guests')
        .update(updatedFields)
        .eq('id', id!);

    if (error) throw new Error('Guest could not be updated');

    return data;
}
