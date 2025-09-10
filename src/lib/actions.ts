'use server';

import { signIn, signOut } from './auth';
import { revalidatePath } from 'next/cache';
import { updateGuest } from './supabase/dataService/guest.service';
import { getGuestId, getUpdateData } from '../utils/guestProfileUpdate';

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
