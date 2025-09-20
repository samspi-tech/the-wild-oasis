import { auth } from '../lib/auth';

export async function getGuestId() {
    const session = await auth();
    if (!session) throw new Error('You must be logged in');

    return session.user.guestId;
}

function testNationalID(nationalID: string) {
    return /^[a-zA-Z0-9]{6,12}$/.test(nationalID);
}

export function getGuestUpdateData(formData: FormData) {
    const nationalID = <string>formData.get('nationalID');

    const [nationality, countryFlag] = (<string>(
        formData.get('nationality')
    )).split('%');

    if (!testNationalID(nationalID)) {
        throw new Error('Please provide a valid national ID');
    }

    return { nationalID, nationality, countryFlag };
}
