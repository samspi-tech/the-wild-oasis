'use server';

import { auth, signIn, signOut } from './auth';
import { testNationalID } from '../utils/testNationalID';
import { updateGuest } from './supabase/dataService/guest.service';

export async function signInAction() {
    await signIn('google', { redirectTo: '/account' });
}

export async function signOutAction() {
    await signOut({ redirectTo: '/' });
}

export async function updateGuestProfile(formData: FormData) {
    const session = await auth();
    if (!session) throw new Error('You must be logged in');

    const guestId = session.user.guestId;

    const nationalID = <string>formData.get('nationalID');
    const [nationality, countryFlag] = (<string>(
        formData.get('nationality')
    )).split('%');

    if (!testNationalID(nationalID)) {
        throw new Error('Please provide a valid national ID');
    }

    const updateData = { nationalID, nationality, countryFlag };

    await updateGuest(guestId, updateData);
}
