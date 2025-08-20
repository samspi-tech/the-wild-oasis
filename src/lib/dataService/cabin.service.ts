import { supabase } from '../supabase';
import { notFound } from 'next/navigation';
import { type Tables } from '../database.types';
import { type QueryData } from '@supabase/supabase-js';

export type Cabin = Tables<'cabins'>;

export async function getSingleCabin(id: number): Promise<Cabin | null> {
    const { data, error } = await supabase
        .from('cabins')
        .select('*')
        .eq('id', id)
        .single();

    if (error) notFound();

    return data;
}

const allCabinsQuery = supabase
    .from('cabins')
    .select('id, name, maxCapacity, regularPrice, discount, image')
    .order('name');

export type Cabins = QueryData<typeof allCabinsQuery>;

export async function getAllCabins() {
    const { data, error } = await allCabinsQuery;

    if (error) throw new Error('Cabins could not be loaded');

    const cabins: Cabins = data;
    return cabins;
}
